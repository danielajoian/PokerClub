export default function playerAuthHeader() {
    const player = sessionStorage.getItem('username');

    if (player && player.token) {
        return {
            Authorization: 'Bearer ' + player.token
        }
    }else {
        return {}
    }
}