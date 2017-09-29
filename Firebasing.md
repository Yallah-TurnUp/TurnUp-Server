1. Authentications:
  - Setup email and password as sign-in method
2. Go to users:
  - Add User and get the User UID
3. Go to Database - rules: Replace the rules with this by adding your own User UID
    {
    "rules": {
      "events": {
        "$uid": {
          ".read": "$uid === auth.uid || auth.uid === '<User UID>'",
          ".write": "$uid === auth.uid || auth.uid === '<User UID>'",
        }
      },
      "shortcutMap": {
        ".read": "auth.uid === '<User UID>'",
        ".write": "auth != null"
      }
    }
  }
4. Go to Database and start adding database
