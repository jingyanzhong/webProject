const foreverContent = document.getElementById('foreverListContent');
const foreverListData = JSON.parse(localStorage.getItem('foreverData')) || [];
// console.log(foreverListData);

foreverListShow();
function foreverListShow(){
    let str = '';
    let starStr = '';
    let photo = '';
    if(foreverListData == ''){
        foreverContent.innerHTML = '';
    }

    foreverListData.forEach(function(item,index){
        if(item.Grade == 3){
            starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
        }else if(item.Grade == 4){
            starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
        }else if (item.Grade == 5){
            starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
        }else{
            starStr = '';
        }
        // 如果沒照片的話,加上img內的圖
        if(item.Picture1 == ''){
            photo = `img/pic_icon.jpg`
        }else{
            photo = `${item.Picture1}`
        }
        str += `<div class="col-12 col-md-10 col-lg-8 shadow  mx-md-auto mb-4 position-relative" data-aos="fade-up" data-aos-duration="1000">
        <div class="colse position-absolute">
            <i class="fa-solid fa-xmark p-3" data-del="${index}"></i>
        </div>
        <div class="row g-0">
            <div class="col-12 col-md-6 col-lg-7">
                <img class="listImg" src="${photo}" alt="">
            </div>
            <div class="col-12 col-md-6 col-lg-5 d-flex flex-column">
                <div class="listContent mt-3 mt-md-5 mx-4">
                    <h4 class="fw-bold">${item.Name}</h4>
                    <p class="text-primary">
                        ${starStr}
                    </p>
                    <p>${item.Add}</p>
                </div>
                <div class="btnBox mt-auto">
                <button type="button" class="cardBtn btn btn-primary fs-5 fw-bold w-100 rounded-0" data-id="${index}" data-model="0" data-bs-toggle="modal" data-bs-target="#exampleModal">查看詳細資訊</button>
                </div>
            </div>
        </div>
    </div>`

    foreverContent.innerHTML = str ;
    })
}

foreverContent.addEventListener("click",function(e){
    let dataId ;
    let dataDel ;
    if(e.target.nodeName == 'BUTTON'){
        dataId = e.target.dataset.id;
        // console.log(dataId);
        showList(dataId);
    }else if(e.target.nodeName == 'I'){
        dataDel = e.target.dataset.del;
        // console.log(dataDel);
        foreverListData.splice(dataDel,1);
        foreverListShow();
        const newDataStr = JSON.stringify(foreverListData);
        localStorage.setItem("foreverData",newDataStr);
        
    }
})

function showList(dataId){
    let nowData = [];
    foreverListData.forEach(function(item,index){
        if(index == dataId){
            nowData = item;
        }
    })
    // console.log(nowData.Name);

    // 在model上顯示飯店資訊
    const modalBody = document.getElementById('modal-body');
    let starStr = '' ;
    let photo = '' ;
    // 判斷星級
    if(nowData.Grade == 3){
        starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
    }else if(nowData.Grade == 4){
        starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
    }else if (nowData.Grade == 5){
        starStr = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
    }else{
        starStr = '';
    }
    // 如果沒照片的話,加上img內的圖
    if(nowData.Picture1 == ''){
        photo = `img/pic_icon.jpg`
    }else{
        photo = `${nowData.Picture1}`
    }
    // 要顯示的html
    let modelStr = `
    <div class="row mb-4">
        <div class="col-12 col-lg-7 mb-3 mb-lg-0">
            <img class="productImg" src="${photo}" alt="${nowData.Name}">
        </div>
        <div class="col-12 col-lg-5">
            <h3 class="fw-bold">${nowData.Name}</h3>
            <p class="text-primary">
                ${starStr}
            </p>
            <p class="mb-3">${nowData.Add}</p>
            <p class="gray">${nowData.Description}
            </p>
            <p>
                最低價：${nowData.LowestPrice}起
            </p>
            <button class="btn btn-primary fw-bold">立即訂房</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-lg-4 mb-4 mb-lg-0">
            <div class="productInfo bg-primary text-center">
                <img class="productIcon mx-auto mb-3" src="img/icon01.png" alt="icon01">
                <h5>停車資訊</h5>
                <p>${nowData.Parkinginfo}</p>
            </div>
        </div>
        <div class="col-12 col-lg-4 mb-4 mb-lg-0">
            <div class="productInfo bg-primary text-center">
                <img class="productIcon mx-auto mb-3" src="img/icon02.png" alt="icon01">
                <h5>服務設施</h5>
                <p>${nowData.Serviceinfo}</p>
            </div>
        </div>
        <div class="col-12 col-lg-4 mb-4 mb-lg-0">
            <div class="productInfo bg-primary text-center">
                <img class="productIcon mx-auto mb-3" src="img/icon03.png" alt="icon01">
                <h5>聯絡資訊</h5>
                <p class="mb-2">${nowData.Tel}</p>
                <p>${nowData.IndustryEmail}</p>
            </div>
        </div>
    </div>`;
    modalBody.innerHTML = modelStr ;
}