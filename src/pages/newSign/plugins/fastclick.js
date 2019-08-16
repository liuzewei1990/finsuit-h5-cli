import FastClick from 'fastclick'
console.warn("引入fastclick支持！")
FastClick.attach(document.body);
if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "productionTest") {
}
