const apiKey = `DyK8Jn6G7XYNSkdRGy3biV4dgr1vvuQQrnPtD37kEGXKusx8x-maIz54XCnPEfokNlVeLXTNAg4woF6kdZ-WyLHL9ZfiJfQ8OLP6Wq9ruOI9sQMBlnNKDNR0o33VXnYx`;
const businessesURL = `https://api.yelp.com/v3/businesses/search?`


const Yelp = {
    search(term, location, sortBy) {
        const urlToFetch = `https://cors-anywhere.herokuapp.com/${businessesURL}?term=${term}&location=${location}&sort_by=${sortBy}`
        return fetch(urlToFetch, { headers: { Authorization: `Bearer ${apiKey}` } }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }

                });
            }
        });
    }
}


export default Yelp;