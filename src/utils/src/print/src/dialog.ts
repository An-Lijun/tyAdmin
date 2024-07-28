const styleStr =`
  .print__dialog {
      border: unset;
      background-color: #fff;
      background-clip: padding-box;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
      pointer-events: auto;
      width: 520px;
      padding: unset;
      --reslove:#1890ff;
      --reject:#f5f5f5;
    }
    .print__dialog::backdrop {
      background-color: rgba(0, 0, 0, .45);
    }
    .print__dialog header{
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
    }
    
    .print__dialog header .title{
      margin: 0;
      color: rgba(0, 0, 0, .85);
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      word-wrap: break-word;
    }
    .print__dialog  .close {
      width: 13px;
      height: 13px;
      display: inline-block;
      background: rgba(0, 0, 0, .45);;
      /* background-color: var(--primary-3); */
      clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
    }
    .print__dialog .reslove{
      background-color: var(--reslove);
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      margin-right: 8px;
    }
    .print__dialog .reject{
      background-color:var(--reject); 
      color: rgba(0, 0, 0, 0.85);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      margin-right: 8px;
    }
    .print__dialog main{
      color: rgba(0, 0, 0, .65);
    }

`


function getCheckbox(list) {
  let str = ''
  list.forEach(item => {
    str += `
      <label >
        <input type="checkbox" checked value= "${ item.dataIndex }">
        ${item.title}
      </label>`
  })
  return str
}
const getDialog =list=>{
  return `
    <header>
      <span class="title">
        请选择打印列
      </span>
      <span class="close">
      </span>
    </header>
    <div style="padding: 24px;">
      <main>
          ${getCheckbox(list)}
      </main>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
        <button class="reject">取消</button>
        <button class="reslove">确认</button>
      </div>
    </div>
    </div>
`
}


export function genDialog(iframe,list,changeSelected,clickOkFn) {
  let style = document.querySelector('#print__dialog-style')

  if (!style) {
    const styleElement = document.createElement('style');
    styleElement.id = 'print__dialog-style';
    styleElement.textContent = styleStr;
    document.head.appendChild(styleElement);
  }

  const dialogElement = document.createElement('dialog');
  dialogElement.id = 'print__dialog';
  dialogElement.className = 'print__dialog';
  dialogElement.innerHTML = getDialog(list);
  document.body.appendChild(dialogElement);
  
  dialogElement.showModal()

  setTimeout(()=>{
    dialogElement.querySelectorAll('input').forEach(inputNode => {
      inputNode.addEventListener('input', (e) => {
        changeSelected((e.target as HTMLInputElement).value)
      })
    })
    dialogElement.querySelector('.reslove')?.addEventListener('click', () => {
      clickOkFn()
    })

    dialogElement.querySelector('.reject')?.addEventListener('click', () => {
      document.body.removeChild(dialogElement);
      document.body.removeChild(iframe)
      dialogElement.close()
    })
  })
  
  return dialogElement;
}