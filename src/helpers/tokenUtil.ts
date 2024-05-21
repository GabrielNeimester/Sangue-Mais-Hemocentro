export default function getToken (){
    const cookieString = document.cookie;
    const tokenCookie = cookieString.split('; ').find(row => row.startsWith('token='))

    if (tokenCookie) {
        const token = tokenCookie.split('=')[1]
            return token
        
    } 
    else {
        return "Token não encontrado"
    }
}