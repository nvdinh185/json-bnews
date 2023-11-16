function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var dId = getParameterByName('did');

async function getData() {

    const detailElement = $("#detail");
    try {
        // lấy chi tiết tin theo dId
        var newsById = await axios.get(`http://localhost:3000/news/${dId}`);
        newsById = newsById.data;

        detailElement.replaceWith(`
            <h1 class="title">${newsById.description}</h1>
            <div class="items-new">
                <div class="new-detail">
                    <p>${newsById.detail}</p>
                </div>
            </div>
        `);

        var listNews = await axios.get('http://localhost:3000/news');
        listNews = listNews.data;

        // Lọc ra những tin tức liên quan (là những tin cùng danh mục nhưng khác tin đang xem)
        var listRelatedNews = listNews.filter(function (news) {
            return (news.catId === newsById.catId && news.id !== newsById.id);
        })
        // console.log(listRelatedNews);
        var listRelatedElement = $('#list-related');

        listRelatedNews.forEach(function (news) {
            const liElement = $('<li></li>');
            liElement.html(`
                <h2>
                    <a href="chitiet.html?did=${news.id}" title="">${news.description}</a>
                </h2>
                <div class="item">
                    <a href="chitiet.html?did=${news.id}" title=""><img src=${news.image} alt=${news.image}></a>
                    <p>${news.detail}</p>
                    <div class="clr"></div>
                </div>
            `);

            listRelatedElement.append(liElement);

        })
    } catch (err) {
        console.log('Lỗi ' + err);
        detailElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();