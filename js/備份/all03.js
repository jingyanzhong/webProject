$(document).ready(function () {
    // 首頁動畫效果
    $(window).scroll(function(){
        let scrollPos = $(window).scrollTop();
        let windowHeight = $(window).height();
        // console.log(scrollPos,windowHeight);
        $('.animated').each(function(){
            let thisPos = $(this).offset().top;
            // console.log(thisPos);
            if((windowHeight + scrollPos) >= thisPos){
                // console.log('位置到了')
                $(this).addClass('fadeIn');
              };
        })
    })
});

const zoneSelect = document.getElementById('zoneSelect');
const zoneBtn = document.getElementById('zoneBtn');
const productTitle = document.getElementById('productTitle');
const productsContent = document.getElementById('productsContent');
const cardBtn = document.getElementById('cardBtn');
const pagination = document.getElementById('pagination');
const star = document.querySelectorAll('[name = star]');
const house = document.querySelectorAll('[name = house]');
const starIcon = document.getElementById('starIcon');

let data = [];
let taipeiData = JSON.parse(sessionStorage.getItem('data')) || [];
let cacheData = [];
let allTown = [];
let starValue = [];
let hotelValue = [];
let townValue ;

// 取得data
if(taipeiData == ""){
    getData();
}else{
    getDistricts();
}
function getData() {
    const corsURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'https://gis.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json';
    axios
        .get(`${corsURL}${apiURL}`)
        .then((response) => {
            data = response.data.XML_Head.Infos.Info;
            filterData(data);
        }) // 把结果集传到info这个数组
        .catch((error) => {
            console.warn(error);
        });
}
// 篩選出台北市data
function filterData(data){
    data.forEach(function(item){
        if(item.Region == '臺北市'){
            taipeiData.push(item)
        }
    })

    let dataStr = JSON.stringify(taipeiData);
    sessionStorage.setItem('data', dataStr);

    console.log(taipeiData);
    getDistricts();
}
// 篩選出行政區
function getDistricts(){
    let unTown = taipeiData.map(function(item){
        return item.Town
    })
    // 篩選出不重複的行政區
    allTown = unTown.filter(function(item,index){
        return unTown.indexOf(item) === index
    })
    showOptions();
}

// show出所有行政區
function showOptions(){
    let str = `<option selected>請選擇行政區</option>`;
    allTown.forEach(function(item){
        str += `<option value="${item}">${item}</option>`
    })
    zoneSelect.innerHTML = str ;
}

// 顯示行政區名稱
function showTitle(value){
    productTitle.textContent = value ;
}

// show出飯店list
function showList(town,hotel,star,page){
    console.log(star[0],'搜尋後');
    cacheData = taipeiData.filter(function(item){
        if(item.Town === town && hotel == '' && star == ''){
            return item
        }else if(hotel == 'hotel'){
            if(star == ''){
                if(item.Town === town && (item.Class == 1 || item.Class == 2)){
                    return item
                }
            }else{
                if(item.Town === town && (item.Class == 1 || item.Class == 2) && (item.Grade == star[0] || item.Grade == star[1] ||item.Grade == star[2])){
                    return item
                }
            }
            
        }else if(hotel == 'b_b'){
            if(star == ''){
                if(item.Town === town && (item.Class == 3 || item.Class == 4 || item.Class == 5)){
                    return item
                }
            }else{
                if(item.Town === town && (item.Class == 3 || item.Class == 4 || item.Class == 5) && (item.Grade == star[0] || item.Grade == star[1] ||item.Grade == star[2])){
                    return item
                }
            }
        }else if(hotel == ''){
            if(item.Town === town && (item.Grade == star[0] || item.Grade == star[1] ||item.Grade == star[2])){
                return item
            }
        }
        // if(item.Town === town && (item.Grade == star[0] || item.Grade == star[1] ||item.Grade == star[2])){
        //     return item
        // }
    })
    console.log(cacheData);

    const cacheDataLen = cacheData.length;
    let totalPage = Math.ceil(cacheDataLen / 18);
    let str = '';
    let starStr = '';
    let photo = '';
    if(cacheData == ''){
        alert('找不到相符的資料，請重新搜尋');
        return
    }else{
        if(page == totalPage){
            for(let i = (page * 18)-18; i < cacheDataLen; i++){
                // 判斷星級為幾星
                if(cacheData[i].Grade == 3){
                    starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
                }else if(cacheData[i].Grade == 4){
                    starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
                }else if (cacheData[i].Grade == 5){
                    starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
                }else{
                    starStr = '';
                }
                // 如果沒照片的話,加上img內的圖
                if(cacheData[i].Picture1 == ''){
                    photo = `img/pic_icon.jpg`
                }else{
                    photo = `${cacheData[i].Picture1}`
                }
        
                str += `<div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card rounded-0">
                    <div class="heartIcon">
                        <i class="far fa-heart text-white" id="heart"></i>
                    </div>
                    <img src="${photo}" class="card-img-top rounded-0" alt="hotel01" height="335px">
                    <div class="card-body">
                        <h4>${cacheData[i].Name}</h4>
                        <p class="text-primary" id="starIcon">${starStr}</p>
                        <p class="card-text">${cacheData[i].Add}</p>
                    </div>
                    <a href="productsItem.html" class="cardBtn btn btn-primary py-3 w-100 rounded-0" data-id="${i}">查看詳細資訊</a>
                </div>
            </div>`
            }
        }else{
            for(let i = (page * 18)-18; i < page*18; i++){
                if(cacheData[i].Grade == 3){
                    starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
                }else if(cacheData[i].Grade == 4){
                    starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
                }else if (cacheData[i].Grade == 5){
                    starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
                }else{
                    starStr = '';
                }
        
                if(cacheData[i].Picture1 == ''){
                    photo = `img/pic_icon.jpg`
                }else{
                    photo = `${cacheData[i].Picture1}`
                }
        
                str += `<div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card rounded-0">
                    <div class="heartIcon">
                        <i class="far fa-heart text-white" id="heart"></i>
                    </div>
                    <img src="${photo}" class="card-img-top rounded-0" alt="hotel01" height="335px">
                    <div class="card-body">
                        <h4>${cacheData[i].Name}</h4>
                        <p class="text-primary" id="starIcon">${starStr}</p>
                        <p class="card-text">${cacheData[i].Add}</p>
                    </div>
                    <a href="productsItem.html" class="cardBtn btn btn-primary py-3 w-100 rounded-0" data-id="${i}">查看詳細資訊</a>
                </div>
            </div>`
            }
        }
    }
    productsContent.innerHTML = str ;
    showPage(page , totalPage);
}

// show出pagination頁數
function showPage(page,totalPage){
    let str = '';
    let total = Number(totalPage);
    let nowPage = Number(page) ;

    if(nowPage -1 < 1){
        str += `<li class="page-item" disabled><a class="page-link" href="#" data-page="${1}">Previous</a></li>`
    }else{
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${nowPage - 1}">Previous</a></li>`
    }
    
    for(let i = 1; i <= total; i++){
        if(i == nowPage){
            str += `<li class="page-item"><a class="page-link active" href="#" data-page="${i}">${i}</a></li>`
        }else{
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
        }
        
    }

    if(nowPage == total){
        str += `<li class="page-item" disabled><a class="page-link" href="#" data-page="${total}">Next</a></li>`
    }else{
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${nowPage + 1}">Next</a></li>`
    }

    pagination.innerHTML = str;
}

function saveData(nowData,cacheData){
    let newData;
    cacheData.forEach(function(item,index){
        if(index == nowData){
            newData.push(item)
        }
    })
    console.log(newData);
    let newStr = JSON.stringify(newData);
    sessionStorage.setItem('nowData', newStr);
}

// 監聽事件
zoneBtn.addEventListener('click', function (e) {
    e.preventDefault();
    starValue = [];
    hotelValue = [];
    townValue = zoneSelect.value;
    console.log(townValue);
    // 取出住宿類型的值
    house.forEach(function (item) {
        if (item.checked === true) {
            hotelValue = item.value;
        }
    })
    console.log(hotelValue);

    // 取出星級checkbox的值
    star.forEach(function (item) {
        if (item.checked === true) {
            starValue.push(item.value);            
        }
    })
    console.log(starValue);

    showTitle(zoneSelect.value);
    showList(townValue,hotelValue,starValue,1);
})

pagination.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){
        return
    }
    let nowPage = e.target.dataset.page;
    showList(townValue,hotelValue,starValue,nowPage);
})

productsContent.addEventListener("click",function(e){
    // 儲存點選的card的data-id
    let nowData ;
    if(e.target.nodeName !== 'A'){
        return
    }else{
        nowData = e.target.dataset.id;
    }
    // 儲存點擊到的飯店資訊
    let newData = [];
    cacheData.forEach(function(item,index){
        if(index == nowData){
            newData.push(item)
        }
    })
    // 轉成純字串並放入sessionStorage
    let newStr = JSON.stringify(newData);
    sessionStorage.removeItem('nowData');
    sessionStorage.setItem('nowData', newStr);
})


function productItem(){
    
}