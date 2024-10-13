from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

@api_view(['POST'])
def register(request):
    data = request.data

    # Checking if email already exists
    if User.objects.filter(username=data.get('email')).exists():
        return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Get user_type from the request (either 'organizer' or 'regular')
    user_type = data.get('user_type', 'regular').lower()

    if user_type not in ['organizer', 'regular']:
        return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user
    user = User.objects.create(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        username=data.get('email'),
        email=data.get('email')
    )
    user.set_password(data.get('password'))  # Set password securely
    user.is_staff = True if user_type == 'organizer' else False  # Set `is_staff` for organizers
    user.save()

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user_type': user_type,
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate user
    user = authenticate(username=email, password=password)

    if user is not None:
        user_type = 'organizer' if user.is_staff else 'regular'

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_type': user_type,
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
