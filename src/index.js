import './index.less';

class Animal {
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

const dog = new Animal('dog');
console.log('aaa');

if(module && module.hot) {
    module.hot.accept()
}
