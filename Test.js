(function () {
    'use strict';

    function replaceData(data) {
        if (!data) return data;

        // Польские названия
        if (data.title_pl) {
            data.title = data.title_pl;
        }

        if (data.name_pl) {
            data.name = data.name_pl;
        }

        // Польские описания
        if (data.overview_pl) {
            data.overview = data.overview_pl;
        }

        // Польские постеры
        if (data.poster_path_pl) {
            data.poster_path = data.poster_path_pl;
        }

        return data;
    }

    function patchItem(item) {
        if (!item) return item;

        // Сохраняем оригинал
        item.title_pl = item.title || '';
        item.name_pl = item.name || '';
        item.overview_pl = item.overview || '';

        // TMDB PL poster
        if (item.poster_path) {
            item.poster_path_pl = item.poster_path;
        }

        return replaceData(item);
    }

    // Перехват карточек
    Lampa.Listener.follow('full', function (e) {
        if (e && e.data && e.data.movie) {
            patchItem(e.data.movie);
        }
    });

    // Перехват списков
    Lampa.Listener.follow('complite', function (e) {
        if (e && e.data && Array.isArray(e.data.results)) {
            e.data.results.forEach(patchItem);
        }
    });

    // Принудительно ставим польский язык
    if (Lampa.Storage) {
        Lampa.Storage.set('language', 'pl');
    }

    console.log('Polish TMDB plugin loaded');
})();
