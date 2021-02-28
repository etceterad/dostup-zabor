jQuery(document).ready(function ($) {
    Vue.directive('tooltip', VTooltip.VTooltip)
    var vm = new Vue({
        el: '#calc',
        data: {
            image: data_calc.image,
            type: type_zabor,
            model: {
                dlina: "",
                vysota: "",
                tip_pokrytiia: "",
                tolshchina: "",
                shirina_vorot: "",
                kol_vorot: "",
                kol_kalitok: "",
                shosse: "",
                distance: ""
            },
            isErrordlina: false,
            isErrorvysota: false,
            isErrortip_pokrytiia: false,
            isErrortolshchina: false,
            // нажатие на кнопку расчитать
            calcClick: false,
            link: "",
            //    ******state*********************
            tip_pokrytiia: data_calc.tip_pokrytiia,

            price_data: {
                table_price: data_calc.price,
                table_price_vorot: data_calc.table_price_vorot,
                table_price_kalitka: data_calc.table_price_kalitka,
                delivery: data_calc.delivery,
            },
            actions:{
                'prof':data_calc.actions,
                'evroshtaketnik':data_evroshtaketnik.actions,
                'setkarabica':data_setkarabic.actions,
            },
            shosse: data_calc.shosse,
            table_price_hidden: false, //скрыть таблицу расчета
            showResult: false,
            // расчитать
            disabled: false,
            price: 0,
            price_dlina: 0,
            price_vorot: 0,
            total_vorot: 0,
            price_kalitok: 0,
            total_kalitok: 0,
            total_not_sales: 0,
            total_delivery: 0,
            start_sales: data_calc.start_sales,
            sales_procent: data_calc.sales,
            sales: 0,
            total: 0,
            // ошибки глобальные в расчете
            errorGlobal: {
                error1: false
            },
            //    ******state
        },
        computed: {
            vysota_text() {
                return parseFloat(this.model.vysota.replace(",", ".")) + 1;
            },
            // ошибка количество ворот не выбрано
            vorotRelationsCount() {
                if (this.calcClick) {
                    if (this.model.shirina_vorot !== "" && this.model.kol_vorot == "") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            // ошибка ширина ворот не выбрана
            vorotRelationsShirina() {
                if (this.calcClick) {
                    if (this.model.shirina_vorot == "" && this.model.kol_vorot !== "") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        },

        mounted(){

        },

        methods: {

            setType(type) {
                if (this.type == type) {
                    return false;
                }
                this.type = type;
                this.showResult = false;
                this.disabled = false;

                this.model.vysota = "";
                this.model.tip_pokrytiia = "";
                this.model.tolshchina = "";
                this.model.kol_vorot = "";
                this.model.shirina_vorot = "";
                this.model.kol_kalitok = "";
                if (type == 'prof') {

                    this.image = data_calc.image;
                    this.tip_pokrytiia = data_calc.tip_pokrytiia;
                    this.tolshchina = data_calc.tolshchina;

                    this.price_data.table_price = data_calc.price;
                    this.price_data.table_price_vorot = data_calc.table_price_vorot;
                    this.price_data.table_price_kalitka = data_calc.table_price_kalitka;
                    this.price_data.delivery = data_calc.delivery;

                }
                if (type == 'evroshtaketnik') {

                    this.image = data_evroshtaketnik.image;
                    this.tip_pokrytiia = data_evroshtaketnik.tip_pokrytiia;
                    this.tolshchina = data_evroshtaketnik.tolshchina;

                    this.price_data.table_price = data_evroshtaketnik.price;
                    this.price_data.table_price_vorot = data_evroshtaketnik.table_price_vorot;
                    this.price_data.table_price_kalitka = data_evroshtaketnik.table_price_kalitka;
                    this.price_data.delivery = data_evroshtaketnik.delivery;


                }
                if (type == 'setkarabica') {

                    this.image = data_setkarabic.image;
                    this.tip_pokrytiia = data_setkarabic.tip_pokrytiia;
                    this.tolshchina = [];//нету толщины

                    this.price_data.table_price = data_setkarabic.price;
                    this.price_data.table_price_vorot = data_setkarabic.table_price_vorot;
                    this.price_data.table_price_kalitka = data_setkarabic.table_price_kalitka;
                    this.price_data.delivery = data_setkarabic.delivery;
                }

                $('#image').attr('src',this.image);
            },

            validate() {
                let b = true;
                // длина
                if (this.isNumeric(this.model.dlina) && parseInt(this.model.dlina) > 19) {
                    this.isErrordlina = false;
                } else {
                    b = false;
                    this.isErrordlina = true;
                }

                //высоту забора
                if (this.model.vysota == "") {
                    b = false;
                    this.isErrorvysota = true;
                } else {
                    this.isErrorvysota = false;
                }
                //тип покрытия
                if (this.model.tip_pokrytiia == "") {
                    b = false;
                    this.isErrortip_pokrytiia = true;
                } else {
                    this.isErrortip_pokrytiia = false;
                }
                //толщину листа
                // для сетки рябицы это не надо
                if (
                    this.model.tolshchina == "" &&
                    this.type !== "setkarabica"
                ) {
                    b = false;
                    this.isErrortolshchina = true;
                } else {
                    this.isErrortolshchina = false;
                }
                return b;
            },

            calc() {
                this.calcClick = true;
                this.setDisabled()
                if (this.validate()) {
                    this.calc_store(this.model);
                    this.setActions();
                }
                this.setDisabled()
            },
            calc_store(data) {
                this.price = 0;
                this.price_dlina = 0;
                this.price_vorot = 0;
                this.total_vorot = 0;
                this.price_kalitok = 0;
                this.total_kalitok = 0;
                this.total_delivery = 0;
                this.total = 0;
                this.total_not_sales = 0;
                this.sales = 0;
                // для рябицы считаем по другому
                if (this.type == "setkarabica") {
                    this.price_data.table_price.forEach(element => {
                        if (data.tip_pokrytiia == element.tip_pokrytiia && data.vysota == element.vysota) {
                            this.price = element.price;
                        }
                    })
                } else {
                    this.price_data.table_price.forEach(element => {
                        if (data.tip_pokrytiia == element.tip_pokrytiia) {
                            // костыль для толщины
                            let tolshchina = [];
                            element.data_item.forEach(item => {
                                tolshchina.push(item.tolshchina)
                                if (item.tolshchina == data.tolshchina && item.vysota == data.vysota) {
                                    this.price = item.price;
                                }
                            })
                            // тут ловим ошибочку нет такой толщины
                            if (jQuery.inArray(data.tolshchina, tolshchina) == -1) {
                                this.errorGlobal.error1 = true;
                            } else {
                                this.errorGlobal.error1 = false;
                            }

                        }
                    });
                }
                this.total_not_sales = this.total = this.price_dlina = parseInt(this.price) * parseInt(data.dlina);
                // ворота
                if (data.kol_vorot !== "" && data.shirina_vorot !== "") {
                    this.price_data.table_price_vorot.forEach(element => {
                        if (element.shirina_vorot == data.shirina_vorot && data.vysota == element.vysota) {
                            this.price_vorot = parseInt(element.price);
                        }
                    })
                    this.total_vorot = parseInt(data.kol_vorot) * this.price_vorot;
                    this.total_not_sales = this.total += this.total_vorot;
                    $('#model_kol_vorot').text(this.model.kol_vorot)
                    $('#price_vorot').text(this.price_vorot)
                    $('#total_vorot').text(this.total_vorot)
                }
                // калитки
                if (data.kol_kalitok !== "") {
                    this.price_data.table_price_kalitka.forEach(element => {
                        if (data.vysota == element.vysota) {
                            this.price_kalitok = parseInt(element.price)
                        }
                    })
                    this.total_kalitok = parseInt(data.kol_kalitok) * this.price_kalitok;
                    this.total_not_sales = this.total += this.total_kalitok;
                    $('#model_kol_kalitok').text(this.model.kol_kalitok)
                    $('#price_kalitok').text(this.price_kalitok)
                    $('#total_kalitok').text(this.total_kalitok)
                }
                // доставка
                if (data.shosse !== "" && data.distance !== "") {
                    this.price_data.delivery.some(element => {
                        if (element.shosse == data.shosse && parseInt(data.distance) <= parseInt(element.расстояние)) {
                            this.total_delivery = parseInt(element.price);
                            return true;
                        }
                    });
                    this.total_not_sales = this.total += this.total_delivery;
                    $('#total_delivery').text(this.total_delivery)
                }
                // скидка
                if (this.type !== "setkarabica") {
                    if (this.start_sales <= this.total) {
                        this.sales = (this.total * this.sales_procent) / 100;
                        this.total = this.total - this.sales;
                    }
                }
                $('#sales').text(this.numFormatFunc(this.sales))
                $('.salesPrice').text(this.numFormatFunc(this.sales)+"  руб")
                $('.totalPrice').text(this.numFormatFunc(this.total)+"  руб")

                $('.priceData').text(this.numFormatFunc(this.price))
                $('.price_dlina').text(this.numFormatFunc(this.price_dlina))

                $('.total_not_sales').text(this.numFormatFunc(this.total_not_sales)+"  руб")

                $('.model_vysota').text(this.model.vysota);
                $('.model_tip_pokrytiia').text(this.model.tip_pokrytiia);
                $('.model_dlina').text(this.model.dlina);
                $('.model_shirina_vorot').text(this.model.shirina_vorot);
                $('.model_tolshchina').text(this.model.tolshchina);

                this.showResult = true;
            },
            showForm(event) {
                let href = event.target.getAttribute("href");
                // акции
                // let actions = this.addActions();
                // let act_str=JSON.stringify(actions);
                let data = {
                    model: this.model,
                    // actions: actions,
                    type: this.type,
                    vysota_text: this.vysota_text,
                    price: {
                        price: this.price,
                        price_dlina: this.price_dlina,

                        price_vorot: this.price_vorot,
                        total_vorot: this.total_vorot,

                        price_kalitok: this.price_kalitok,
                        total_kalitok: this.total_kalitok,

                        total_delivery: this.total_delivery,
                        total: this.total,

                        sales: this.sales
                    }
                };
                jQuery('[name="data"]', jQuery(href)).val(JSON.stringify(data));
                jQuery.magnificPopup.open({
                    items: {
                        src: event.target.getAttribute("href"),
                        type: "inline"
                    }
                });
            },
            //******************************************************************
            setDisabled() {
                this.disabled = !this.disabled;
            },
            isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            // открытие модалки
            showModal(event) {
                let href = event.target.getAttribute("href");
                jQuery.magnificPopup.open({
                    items: {
                        src: href,
                        type: "inline"
                    }
                });
            },

            numFormatFunc: function (value) {
                return value.toLocaleString();
            },

            // установить акции
            setActions(){
                for (var k in  this.actions[this.type]){
                    var el=this.actions[this.type][k]
                    var dlina=parseInt(el.dlina)
                    var tip_pokrytiia=el.tip_pokrytiia;
                    if(tip_pokrytiia==""){
                        tip_pokrytiia=false;
                    }
                    if(this.model.dlina>=dlina&&(!tip_pokrytiia||tip_pokrytiia==this.model.tip_pokrytiia)){
                        $('.actions_'+this.type+'[data-key="'+k+'"]').removeClass('d-none')
                    }else{
                        $('.actions_'+this.type+'[data-key="'+k+'"]').addClass('d-none')
                    }
                }
            }
        },
        filters: {
            numFormat: function (value) {
                return value.toLocaleString();
            }
        }

    })
})