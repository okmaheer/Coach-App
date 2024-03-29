export default {
  
    async signup(context,payload){
        
    const response = await   fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkBtIqQitXKnk-RinueUZcbMi5HxFqASg',{
        method: 'POST',
        body: JSON.stringify({
            email:payload.email,
            password:payload.password,
            returnSecureToken:true,
        })
         });
         const responseData = await response.json();
           console.log(responseData);
         if (!response.ok) {
           console.log(responseData);
           const error = new Error(responseData.message || 'Failed to authenticate.');
           throw error;
         }
     
         console.log(responseData);
         context.commit('setUser', {
           token: responseData.idToken,
           userId: responseData.localId,
           tokenExpiration: responseData.expiresIn
         });
    }
};
