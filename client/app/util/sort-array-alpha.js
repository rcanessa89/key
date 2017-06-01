export default (array, key) => array.sort((a, b) => {
    const textA = key ? a[key].toUpperCase() : a.toUpperCase();
    const textB = key ? b[key].toUpperCase() : b.toUpperCase();
    
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
