import gis from 'g-i-s';

gis('panadol advance 500mg box egypt', (error, results) => {
    if (error) {
        console.error(error);
    } else {
        console.log(JSON.stringify(results.slice(0, 3), null, 2));
    }
});
