async function getData() {
    const listCatElement = $("#list-cat");
    try {
        // Lấy danh sách danh mục tin
        var listCat = await axios.get('http://localhost:3000/cat');
        listCat = listCat.data;

        listCat.forEach(function (news) {
            const liElement = $('<li></li>');
            liElement.html(`
                <a href="danhmuc.html?cid=${news.id}">${news.name}</a>
            `);

            listCatElement.append(liElement);

        })
    } catch (error) {
        listCatElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();