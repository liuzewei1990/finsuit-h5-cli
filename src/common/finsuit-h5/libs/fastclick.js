import FastClick from 'fastclick'
console.warn("引入fastclick支持！")
if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "productionTest") {
    FastClick.attach(document.body);
}
