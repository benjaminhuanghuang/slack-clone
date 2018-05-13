/* [{path: 'email', message: 'do not exist'}] 
    => 
    { 
        email: ['e1', 'e2']
    }
*/
export default errors => errors.reduce((accumulator, currentValue) => {
    if (currentValue.path in acc)
        accumulator[currentValue.path].push(currentValue.message);
    else
        accumulator[currentValue.path] = [currentValue.message];
    return accumulator;
}, {})