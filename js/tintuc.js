async function getData() {
    const listNewsElement = $("#list-news");

    try {
        var listNews = await axios.get('http://localhost:3000/bnews');
        listNews = listNews.data;

        listNews.forEach(function (news) {
            const liElement = $('<li></li>');
            liElement.html(`
                <h2>
					<a href="chitiet.html?did=${news.id}" title="">${news.description}</a>
				</h2>
                <div class="item">
                    <a href="chitiet.html?did=${news.id}" title=""><img src="${news.image}" alt="" /></a>
                    <p>${news.detail}</p>
                    <div class="clr"></div>
                </div>
            `);

            listNewsElement.append(liElement);

        })
    } catch (err) {
        console.log('Lỗi ' + err);
        listNewsElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();