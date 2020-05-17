import './index.less';

class Animal2 {
    constructor(name) {
        this.name = name;
    }
    getName() {
        import('./test_import.js');
        return this.name;
    }
}

document.getElementById('btn').onclick = function() {
    import('./test_import').then(fn => fn.default());
}

const dog = new Animal2('dog');
console.log('login');

if(module && module.hot) {
    module.hot.accept()
}

console.log('Flag', process.env);