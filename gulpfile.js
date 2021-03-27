const gulp=require('gulp')
//css
const cssmin=require('gulp-cssmin')//压缩
const cssautoprefixer=require('gulp-autoprefixer')//加前缀
//js
const uglify=require('gulp-uglify')//压缩js注意：不能使用es6的语法，否则回报错
const babel=require('gulp-babel')//es6转es5  依赖这两个包 @babel/core @babel/preset-env
//html
const htmlmin=require('gulp-htmlmin')//打包压缩html

//删除dist
const del=require('del')

//启动服务器
const webserver=require('gulp-webserver')

//服务器代理配置
//img
//gulp-imagemin 慢



//gulp4 
const cssHandler=function(){
    return gulp.src('./src/css/*.css')
    // .pipe(cssautoprefixer({browsers:['last 2 versions']}))
    .pipe(cssautoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

// const sassHandler=function(){
//     return gulp.src('./src/sass/*.sass')
//     .pipe(sass)
//     .pipe(cssautoprefixer())
//     .pipe(cssmin())
//     .pipe(gulp.dest('./dist/css/'))
// }

const jsHandler=function(){
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
}

const htmlHandler=function(){
    return gulp.src('./src/page/*.html')
    .pipe(htmlmin({
        collapseWhitespace:true,
    }))
    .pipe(gulp.dest('./dist/pages/'))
}

const delhandler=function(){
    return del(['./dist/'])
}

const webhandler=function(){
    return gulp.src('./dist')
    .pipe(webserver({
        host:'localhost',//自定义域名C:/window/system32/dirvers/etc/hosts 没有后缀名的
        port:'8181',
        livereload:true,
        open:'./pages/index.html',
        proxies:[
            //不要写空对象在这里
            {
                source:'/dt',
                target:'https://dt/com'

            }
        ]
    }))
}
// const imgHandler=function(){
//     return gulp.src('./src/img/**')
//     .pipe(gulp.imagemin())
//     .pipe(gulp.dest('/dist/image/'))

// }
//需要导出
// module.exports.imgHandler=imgHandler
module.exports.cssHandler=cssHandler
module.exports.jsHandler=jsHandler
module.exports.htmlHandler=htmlHandler
module.exports.delhandler=delhandler
module.exports.webhandler=webhandler

//命令行執行gulp 任务名称
//配置默认任务 。series() .paraliel()返回的是函数

//gulp进行目录清理

// const res=gulp.parallel
// module.exports.default=gulp.parallel(cssHandler,htmlHandler,jsHandler)
module.exports.default=gulp.series(
    delhandler,
    gulp.parallel(cssHandler,htmlHandler,jsHandler),
    webhandler
)
