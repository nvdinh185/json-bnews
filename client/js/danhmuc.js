function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var cId = getParameterByName('cid');

async function getData() {
    const listNewsElement = $("#list-news-by-cat");
    try {
        var listNews = await axios.get('http://localhost:3000/news');
        listNews = listNews.data;

        var listNewsByCat = listNews.filter(function (news) {
            return news.catId === cId;
        })

        listNewsByCat.forEach(function (news) {
            const liElement = $('<li></li>');
            liElement.html(`
                <h2>
                    <a href="chitiet.html?did=${news.id}" title="">${news.description}</a>
                </h2>
                <div class="item">
                    <a href="chitiet.html?did=${news.id}" title=""><img src=${news.image} alt=${news.image} /></a>
                    <p>${news.detail}</p>
                    <div class="clr"></div>
                </div>
            `);

            listNewsElement.append(liElement);

        })

        var catById = await axios.get(`http://localhost:3000/cat/${cId}`);
        catById = catById.data;

        var catName = catById.name;

        var h1Element = $('#cat-name');

        h1Element.text('Tin tức >> ' + catName);
    } catch (err) {
        console.log('Lỗi ' + err);
        listNewsElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();