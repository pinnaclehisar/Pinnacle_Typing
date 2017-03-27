var model = {
      login : function(email,password)
               {
                  if (!firebase.auth().currentUser)
                  {
                                  model.loginWithoutCheck(email,password);
                   }else{
                                  console.log('Already logged in : '+firebase.auth().currentUser);
                                  model.logout();
                                  model.loginWithoutCheck(email,password);
                   }
              },
      loginWithoutCheck : function(email,password){
                    firebase.auth().signInWithEmailAndPassword(email, password)
                         .then(function(firebaseUser)
                          {
                                console.log('Login successful'+firebaseUser.email);
                                presenter.loginSuccess();
                          })
                         .catch(function(error) // Handle Errors here.
                         {
                                 console.log('login error'+error.message);
                                 presenter.loginError(error.message);
                         });
      },
      logout : function()
              {
                  console.log('User : '+firebase.auth().currentUser.email);
                  firebase.auth().signOut();
                  console.log('Successfully logged out');
              }
};

var presenter = {
    login : function(email,password){
                          if(email=="")
                          {
                              view.showError("Enter valid Email Id");
                              return;
                          }
                          else if(password=="")
                          {
                              view.showError("Enter valid Password");
                              return;
                          }
                          else
                          {

                              view.showProgress();
                              model.login(email,password);
                          }
                  },
    loginError    : function(error){
                          view.showError(error);
                  },
    loginSuccess  : function(){
                          window.location = "main.html";
                  }

};

var view = {
  init : function(){

           loginElements = document.getElementById('loginDiv');
           errorElements = document.getElementById('loginError');
           progressElement = document.getElementById('loading');
           emailBox = document.getElementById('email');
           passwordBox = document.getElementById('password');
           loginButton = document.getElementById('loginButton');

            loginButton.addEventListener('click', function(event) {
                        presenter.login(emailBox.value,passwordBox.value);
            });

  },
  showError  : function(error){
          loginElements.style.display = "block";
          progressElement.style.display = "none";
          errorElements.style.display = "block";
          errorElements.innerHTML = error;
  },
  showProgress : function(){
          console.log("Loading ...");
          loginElements.style.display = "none";
          progressElement.style.display = "block";
          errorElements.style.display = "none";
  }
};
firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log(user+' user logged in');
            window.location = "main.html";
        }
        else{
            console.log('Redirect user to login page');
            window.location = 'index.html';
        }
});
view.init();
