// 注册全局组件
import Vue from 'vue';
import HyhIcon from './hyhIcon';


const components = [HyhIcon];

const install = (v) => {
  components.map(component => v.component(component.name, component));
};

if (typeof window !== 'undefined') {
  install(Vue);
}
