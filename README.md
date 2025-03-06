# G-FIT Portal

A web application for physical therapists to track and generate reports for their patients' functional fitness assessments. Built with React, TypeScript, and Firebase.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

3. Start the development server:

```bash
npm start
```

## Features

- 🔐 Authentication with Email/Password and Google Sign-in
- 👥 Patient Management
- 📊 Assessment Tracking:
  - Clinimetrics
  - Flexibility
  - Balance
  - Gait
  - Endurance
  - Aerobic
  - Power
- 📝 PDF Report Generation

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Add these security rules to Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    match /patients/{patientId} {
      allow read: if request.auth != null && 
                   resource.data.therapistId == request.auth.uid;
      allow write: if request.auth != null && 
                    request.resource.data.therapistId == request.auth.uid;
    }
    
    match /visits/{visitId} {
      allow read: if request.auth != null && 
                   resource.data.therapistId == request.auth.uid;
      allow write: if request.auth != null && 
                    request.resource.data.therapistId == request.auth.uid;
    }
  }
}
```

## Tech Stack

- React
- TypeScript
- Firebase (Auth & Firestore)
- Tailwind CSS
- React Router
- React PDF

## Project Structure

```
src/
├── components/     # UI components
├── contexts/      # React contexts
├── pages/         # Page components
├── types/         # TypeScript types
├── utils/         # Utility functions
└── config/        # Configuration
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push to your fork
5. Create a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

