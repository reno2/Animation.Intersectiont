// Проверяем поддержку, и сохраняем, так как используем несколько раз
let isIntersection = false;
if ('IntersectionObserver' in window) isIntersection = true;

$(document).ready(function(){
    $('.js_infoCard').each(function( inx, el ) {
        if (isIntersection) numberObserv.observe(el);
        else animate(el);
    })
})

$('.js_sectionSwitch').on('click', function(){
    if($(this).not(".active")){
        $(this).addClass('active');
        let period = $(this).data('type');
        $(this).siblings().removeClass('active');
        $(document).find('.js_infoCard').each(function( inx, el ) {
            if($(el).hasClass(period)){
                $(el).addClass('show');
                if (isIntersection) numberObserv.observe(el);
                else animate(el);
            }
            else{
                $(el).removeClass('show')
            }
        })
    }
});
// Объекст с параметрами,
// root - область просмотра, весь вьюпорт
// threshold - начало выполнения как только элемент попал во вьюпорт
const options = {
    root: null,
    threshold: 0
};
// Функция обраьтного вызова
function callback(entries, numberObserv){
    entries.forEach(entry => {
        // Проверяем видимость
        if(entry.isIntersecting){
            // Анимируем
            animate(entry.target);
            // Отписываемся от повторного ействия
            numberObserv.unobserve(entry.target);
        }
    })
}
const numberObserv = new IntersectionObserver(callback, options);

// Функция запуска анимации
function animate(el){
    let elCount = $(el).find('.info_cardNum');
    if(elCount.data('count')){
        $({ Counter: 0 }).animate({ Counter: elCount.data('count') }, {
            duration: 1000,
            easing: 'swing',
            step: function () {
                elCount.text(Math.ceil(this.Counter));
            }
        });
    }
}
$('.js_menuLink').on('click', function (e) {
    e.preventDefault();
    let id  = $(this).attr('href'),
        header = $('header').outerHeight(true),
        top = $(id).offset().top - header;
    $('body, html').animate({scrollTop: top}, 500);
});