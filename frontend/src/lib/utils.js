export function formatDate(date){
    return data.toLocaleDataString("en-us",{
        month:"short",
        day:"numeric",
        year:"numeric",
    });
}