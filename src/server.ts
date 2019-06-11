import app from './app'
import ServerVariables from './utils/serverVariables'
const PORT = 3000;

app.listen(PORT, () => {
    ServerVariables.started = new Date()
    console.log('Express server listening on port ' + PORT);
})