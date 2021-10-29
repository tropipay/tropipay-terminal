const app = require('./app/app');
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});