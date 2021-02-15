export function InitTime(time){
    if(!time) return ''
    let date = new Date(time)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+
    '-'+date.getHours()+':'+date.getMinutes()+":"+date.getSeconds()
}