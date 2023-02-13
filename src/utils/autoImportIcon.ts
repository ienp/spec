import svgIcon from '../components/SvgIcon/index.vue'

// 引入所有svg 文件
const requireAll = function (requireContext: any) {
  return Object.values(requireContext)
}

const req = import.meta.globEager('../assets/svg/*.svg')

requireAll(req)

export default function (app: any) {
  app.component('SvgIcon', svgIcon)
}
