import { createDom } from './utils'
import { getBodyrTpl, getHeaderTpl, getFooterTpl } from './constant'
// 获取包体
export function getPackageBody(body, options) {
  let inner = `
    <table class="base-printPage" width="100%">
      ${options?.header ? getHeaderTpl(options.header) : null}
      ${getBodyrTpl(body.outerHTML)}
      ${options?.footer ? getFooterTpl(options.footer) : null}
    </table>`
  return createDom(inner)
}
