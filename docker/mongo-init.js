db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'myapp'
    }
  ]
});

db.createCollection('articles');
db.createCollection('settings');
