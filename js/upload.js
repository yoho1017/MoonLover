(function($) {
    var width_crop = 100, // 圖片裁切寬度 px 值
    height_crop = 100, // 圖片裁切高度 px 值
    type_crop = "circle", // 裁切形狀: square 為方形, circle 為圓形
    width_preview = 100, // 預覽區塊寬度 px 值
    height_preview = 100, // 預覽區塊高度 px 值
    compress_ratio = 0.85, // 圖片壓縮比例 0~1
    type_img = "png", // 圖檔格式 jpeg png webp
    oldImg = new Image(),
    myCrop, file, oldImgDataUrl;
    

    
    function readFile(input) {
    if (input.files && input.files[0]){
    file = input.files[0];
    } else {
    alert("瀏覽器不支援此功能！建議使用最新版本 Chrome");
    return;
    }
    
    if (file.type.indexOf("image") == 0) {
    var reader = new FileReader();

    $('#newImg').addClass("imgNone") //原始圖片消失
    $('.upload_btn').css("display", "none"); //上傳按鈕不見
    $('#crop_img').css("display", "inline-block"); //裁減圖片按鈕出現
    $(".img").attr('id', 'oldImg');  //給大頭貼裁減圖片的id
    $('.img').addClass('crop'); //新增crop畫面

    // 裁切初始參數設定
    myCrop = $("#oldImg").croppie({
        viewport: { // 裁切區塊
        width: width_crop,
        height: height_crop,
        type: type_crop
        },
        boundary: { // 預覽區塊
        width: width_preview,
        height: height_preview
        },
        });

    reader.onload = function(e) {
    oldImgDataUrl = e.target.result;
    oldImg.src = oldImgDataUrl; // 載入 oldImg 取得圖片資訊
    myCrop.croppie("bind", {
    url: oldImgDataUrl
    });
    };
    
    reader.readAsDataURL(file);
    } else {
    alert("您上傳的不是圖檔！");
    }
    }
    
    function displayCropImg(src) {
    var html = `<img src= " ${src} " id="newImg" " />`;
    $(".img").html(html);
    }
    
    $("#upload_img").on("change", function() {
    $("#oldImg").show();
    readFile(this);
    });
    
    oldImg.onload = function() {
    var width = this.width,
    height = this.height,
    fileSize = Math.round(file.size / 1000)
    };
    
    function displayNewImgInfo(src) {
    filesize = src.length * 0.75;
    }
    
    $("#crop_img").on("click", function(event) {
        event.preventDefault();
        myCrop.croppie("result", {
        type: "canvas",
        format: type_img,
        quality: compress_ratio
        }).then(function(src) {
        displayCropImg(src);
        displayNewImgInfo(src);
    });

    $('.img').removeClass('crop'); //移除crop畫面
    $('#crop_img').css("display", "none"); //裁減圖片按鈕消失
    $('.upload_btn').css("display", "flex"); //上傳按鈕回來囉
    $('#oldImg').croppie('destroy');
    $(".img").removeAttr('id', 'oldImg');  //刪除圖片id
    $('#newImg').removeClass("imgNone") //原始圖片回復
    });
    })(jQuery);
    