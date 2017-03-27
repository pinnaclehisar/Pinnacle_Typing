var logout = function(){
    console.log('User : '+firebase.auth().currentUser.email);
    firebase.auth().signOut();
    console.log('Successfully logged out');
}

firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log(user+' user logged in');
        }
        else{
            console.log('Redirect user to login page');
            window.location = 'index.html';
        }
});
