import * as fs from 'fs'

const fileType = ['md', 'vue', 'ts', 'js']
const imgType = ['png', 'img', 'jpg']

// 获取文件详情
export function getFileInfo(e: any) {
  let files: any = Array.from(e.dataTransfer.files)

  const path = files[0].path
  const content = fs.readFileSync(path)

  return {
    path, // 路径
    content, // 内容
    name: files[0].name // 文件名称
  }
}

// 获取文件夹下内容
function getFileList(e: any) {
  let files: any = Array.from(e.dataTransfer.files)

  const list = files.map((item: File, index: number) => {
    console.log('item---->', item)
    return item.path
  })

  list.forEach((filePath: string) => {
    const s = fs.statSync(filePath)
    if (s.isDirectory()) {
      console.log('成功读取文件夹')
      return
    }

    let fileName = ''
    fs.readFile(filePath, (err, data) => {
      let finalFile: string | File

      if (imgType.includes(getFileType(filePath).toLowerCase())) {
        if (data.byteLength > 10000000) {
          finalFile = new File([data], fileName, {
            type: 'text/plain'
          })
        } else {
          finalFile = new File([data], fileName, {
            type: 'image'
          })
        }
      } else {
        console.log(data)
        finalFile = new File([data], fileName, {
          type: ''
        })
      }

      console.log('finalFile--->', finalFile)
    })
  })
}

// 获取文件类型名称
function getFileType(str: string) {
  return str.substring(str.lastIndexOf('.' + 1))
}
