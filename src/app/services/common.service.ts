import { Injectable } from '@angular/core';

import { AngularCsv } from 'angular-csv-files/Angular-csv';
import { nodeName } from 'jquery';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { title } from 'process';
@Injectable({
  providedIn: 'root'
})


export class CommonService {

  constructor(private message: NzMessageService, private modal: NzModalService) { }

  getModal(){
    return this.modal;
  }
  createBasicMessage(text) {

    return this.message.info(text, { nzDuration: 0 }).messageId;

  }

  createMessage(type: string): void {

    this.message.create(type, `Unselect "Hide Legacy Releases" to check more interoperability.`);

  }

  setItem(k, v) {

    sessionStorage.setItem(k, v);

  }

  removeItem(k) {

    sessionStorage.removeItem(k);

  }

  getItem(k) {

    return sessionStorage.getItem(k)

  }

  getVersion(id, data) {
    let originId = this.getOriginPro(id, data);
    return this.getChildVersion(id, originId, data);
  }

  getNameList(id, data) {
    let node = data.filter(r => r.id == id);
    let originId = this.getOriginPro(id, data);
    let arr = this.getChildName(originId, data).split(",");
    return arr.filter(r => r != node[0].name)
  }

  getChildName(id, data) {
    let node = data.filter(r => r.id == id)[0];
    if (!node.childId) {
      return node.name;
    } else {
      return node.name + "," + this.getChildName(node.childId, data)
    }
  }

  getChildVersion(originalId, id, data) {
    let node = JSON.parse(JSON.stringify(data));
    node = node.filter(r => r.id == id)[0];

    if (node.id === originalId) {
      for (var i = 0; i < node.releases.length; i++) {
        node.releases[i].version = node.releases[i].version.split(' - ')[0];
      }
    }
    if (!node.childId) {
      return node.releases
    } else {
      return node.releases.concat(this.getChildVersion(originalId, node.childId, data))
    }

  }

  getOriginPro(id, data) {
    let node = data.filter(r => r.id == id)[0];
    let pNode = data.filter(r => r.id == node.parentId)[0];
    if (node.parentId && pNode) {
      return this.getOriginPro(node.parentId, data)
    } else {
      return node.id
    }
  }

  createModalMessage(title, text) {
    let modal = this.modal;
    return {
      success: function () {
        modal.success({
          nzTitle: title,
          nzContent: text
        });
      },
      info: function () {
        modal.info({
          nzTitle: title,
          nzContent: text
        })
      },
      error: function () {
        modal.error({
          nzTitle: title,
          nzContent: text
        })
      },
      warning: function () {
        modal.warning({
          nzTitle: title,
          nzContent: text
        });
      }
    }
  }

  sortFn(a, b) {

    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;

  }

  sortVersion(a, b) {
    var arr1 = a.version.match(/\S+/g);
    var arr2 = b.version.match(/\S+/g);
    if (arr1 == null || arr2 == null) {
      return 0
    }
    var version1 = arr1[0].replace(/(\.0+)+$/, '').split('.');
    var version2 = arr2[0].replace(/(\.0+)+$/, '').split('.');

    var l = Math.min(version1.length, version2.length);
    var ret;
    for (var i = 0; i < l; i++) {
      ret = parseInt(version2[i], 10) - parseInt(version1[i], 10);
      if (ret)
        return ret;
    }

    ret = version2.length - version1.length;
    if (ret)
      return ret;

    var update1 = arr1[1] || "";
    var update2 = arr2[1] || "";

    if (update1 < update2)
      return 1;
    else if (update1 > update2)
      return -1;
    return 0;
  }

  // sortId(a, b) {

  //   var nameA = a.id.toUpperCase();
  //   var nameB = b.id.toUpperCase();
  //   if (nameA > nameB) {
  //     return -1;
  //   }
  //   if (nameA < nameB) {
  //     return 1;
  //   }

  //   return 0;

  // }

  copy(id) {

    var newElem = document.getElementById(id);
    var range = document.createRange();
    range.selectNode(newElem);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    var successful = document.execCommand('copy');
    window.getSelection().removeAllRanges();
    return successful;

  }

  print(id, css) {

    var jubuData = document.getElementById(id).innerHTML;
    let newWin = window.open();
    newWin.document.body.innerHTML = css + jubuData;
    newWin.print();
    newWin.close();

  }

  csv(id, name: string) {
    let headers = [], data = [], collen = 0, rowlen = 0;

    let trs = document.getElementById(id).getElementsByTagName("tr");
    collen = Array.from(trs[0].getElementsByTagName("th")).length;
    for (let i = 0; i < collen; i++) {
      headers.push(trs[0].getElementsByTagName("th")[i].innerText)
    }
    rowlen = Array.from(trs).length - 1;
    let dataRow = [], dataRowObj = {};
    for (let i = 1; i < rowlen; i++) {
      dataRowObj = {}; dataRow = [];
      for (let j = 0; j < collen; j++) {
        dataRow.push(trs[i].getElementsByTagName("td")[j].innerText)
      }
      dataRowObj = { ...dataRow };
      data.push(dataRowObj)
    }

    data.push({ text: '' });
    data.push({ text: '* This is a legacy release. For more information, please refer to https://lifecycle.vmware.com.' });
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'POS System',
      useBom: true,
      noDownload: false,
      headers: headers,
      nullToEmptyString: true,
    };

    new AngularCsv(data, name, options);
  }

  cssStr = `
  table{
      border-top: solid 1px #d7d7d7;   
      border-left: solid 1px #d7d7d7;   
      border-right: solid 1px #d7d7d7;   
  }
  th:first-child{
      width: 200px;
  }
  td:not(:last-child),th:not(:last-child){
      border-right: solid 1px #d7d7d7;
      
  }
  tr:not(:last-child){
      border-bottom:  solid 1px #d7d7d7;
  }
  td,th{
      border-bottom:  solid 1px #d7d7d7;
      height:69px;
      overflow:hidden;
      font-size:14px;
  }
  td:not(:first-child){
      text-align: center;
      vertical-align:middle;
  }
  td:first-child{
      font-weight: 700;
  }`;

  databaseSwitch(data) {
    // data.
    let dbSelData = [{ name: "Microsoft SQL Server", release: [] },
    { name: "Oracle", release: [] },
    { name: "IBM DB2", release: [] },
    { name: "VMware vFabric Postgres", release: [] },
    { name: "Other", release: [] }
    ]
    let id, value;
    data.forEach(r => {
      id = Object.keys(r)[0];
      value = Object.values(r)[0];
      switch (true) {
        case /Microsoft SQL Server/i.test(value):
          dbSelData[0].release.push({ id: id, value: value });
          break;
        case /Oracle/.test(value):
          dbSelData[1].release.push({ id: id, value: value });
          break;
        case /IBM DB2/.test(value):
          dbSelData[2].release.push({ id: id, value: value });
          break;
        case /VMware vFabric Postgres /.test(value):
          dbSelData[3].release.push({ id: id, value: value });
          break;
        default:
          dbSelData[4].release.push({ id: id, value: value });
          break;
      }
    })
    return dbSelData
  }

  tooltipForCCP = [
    "Print the interoperability matrix",
    // "Generate CSV containing interoperability matrix.",
    "Download CSV of the shown interoperability matrix.",
    "Copy the interoperability matrix to clipboard. "
  ]

  tooltipForLenged = [
    "This products' combination is supported.",
    "This products' combination is supported, but haven't been certified. ",
    "This products' combination is not supported and will not work.",
    "This products' combination may or may not work, and is not supported.",
    "Indicates the product version has gone past its End of General Support date. End of General Support date is the last date on which you can request support; the end of regular VMware maintenance updates and upgrades, bug and severity fixes, and technical assistance as per the Support and Subscription Terms and Conditions. For more lifecycle information, please refer to https://lifecycle.vmware.com.",
    "Indicates the product version has gone past its End of Technical Guidance date. End of Technical Guidance date is the last date on which you can access support and workarounds for low-severity issues on supported configurations only. For more lifecycle information, please refer to https://lifecycle.vmware.com."
    // "Indicate a product version has gone past its End of General Support date. End of General Support date is the last date on which you can request support; the end of regular VMware maintenance updates and upgrades, bug and severity fixes, and technical assistance as per the Support and Subscription Terms and Conditions.",
    // "Indicate a product version has gone past its End of Technical Guidance date. End of Technical Guidance date is the last date on which you can access support and workarounds for low-severity issues on supported configurations only. During the Technical Guidance phase, VMware does not offer new hardware support, server/client/guest OS updates, new severity patches or bug fixes unless otherwise noted."
  ]

  removeRepeat(a): any {
    console.log(a);
    var b = []
    for (var i = 0; i < a.length; i++) {
      // for (var j = a.length - 1; j > i; j--) {
      for(var j =i+1; j < a.length; j++) {
        if (a[i].name.trim() == a[j].name.trim()) {
          a[i].length = a[i].length + a[j].length;
          a[i].releases = a[i].releases.concat(a[j].releases)
          //.sort((a, b) => { return this.sortVersion(a, b) });
          b.push(j)
        }
      }

    }
    // for (var k = 0; k < b.length; k++) {
    for (var k = b.length -1; k > -1; k--) {
      a.splice(b[k], 1)
    }
    return a
  }

  lang = "zh";
  timeCount: boolean = false;
  statusList_en = {
    400: "We're experiencing an error. Please try later.",
    404: "We're experiencing an error. Please try later.",
    500: "We're experiencing an error. Please try later.",
    503: "We're experiencing an error. Please try later."
  }
  statusList_zh = {
    400: "400 (参数错误) 发出的参数错误。",
    404: "404 (未找到) 服务器找不到请求的网页。",
    500: "500 (服务器内部错误) 服务器遇到错误，无法完成请求。",
    503: "503 (服务不可用) 服务器目前无法使用（由于超载或停机维护)。"
  }
  errStatus(id, text?) {
    return
    if (this.timeCount) { return } else { this.timeCount = true; setTimeout(() => { this.timeCount = false }, 3000) }
    if (this.lang == "en" && this.statusList_en[id])
      this.createModalMessage('error', this.statusList_en[id]).error()
    else if (this.statusList_zh[id])
      this.createModalMessage('error', this.statusList_en[id]).error()
    else
      this.createModalMessage('error', "We're experiencing an error. Please try later.").error()

  }

  hideTooltip(data): boolean {
    if (data[0].selectedPro == 0) {
      return true
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].selectedReleases[0] == 0 || data[i].selectedReleases.length == 0) {
        for (let j = 0; j < data[i].VersionData.length; j++) {
          if (!data[i].VersionData[j].genGuided || !data[i].VersionData[j].techGuided) {
            return true
          }
        }
      } else {
        let versionData = [];
        for (let k = 0; k < data[i].VersionData.length; k++) {
          for (let m = 0; m < data[i].selectedReleases; m++) {
            if (data[i].selectedReleases[m] == data[i].VersionData[k].id) {
              versionData.push(data[i].VersionData[k])
            }
          }
        }
        for (let j = 0; j < versionData.length; j++) {
          if (!versionData[j].genGuided || !versionData[j].techGuided) {
            return true
          }
        }
      }
    }
    return false
  }

  hideTooltipDB(rowData, columnData): boolean {
    let versionData = [];
    if (rowData.selectedReleases.length == 0) {
      versionData = rowData.VersionData
    } else {
      for (let j = 0; j < rowData.VersionData.length; j++) {
        for (let k = 0; k < rowData.selectedReleases.length; k++) {
          if (rowData.VersionData[j].id == rowData.selectedReleases[k]) {
            versionData.push(rowData.VersionData[j])
          }
        }
      }
    }
    for (let m = 0; m < versionData.length; m++) {
      if (!versionData[m].genGuided || !versionData[m].techGuided) {
        return true
      }
    }
    return false
  }
}


