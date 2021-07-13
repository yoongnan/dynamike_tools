import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

describe('CommonService', () => {
  let service: CommonService;
  // let NzMessageServiceSpy: jasmine.SpyObj<NzMessageService>;
  // let NzModalServiceSpy: jasmine.SpyObj<NzModalService>;


  beforeEach(() => {
    const MessageSpy = jasmine.createSpy('NzMessageService');
    const ModalSpy = jasmine.createSpy('NzModalService');

    TestBed.configureTestingModule({
      providers: [
        CommonService,
        { provide: NzMessageService, useValue: MessageSpy },
        { provide: NzModalService, useValue: ModalSpy },
      ]
    });
    service = TestBed.inject(CommonService);
    // NzMessageServiceSpy = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
    // NzModalServiceSpy = TestBed.inject(NzModalService) as jasmine.SpyObj<NzModalService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createMessage', () => {
    let j = service.createMessage("info");
  })

  it('createBasicMessage', () => {
    let j = service.createBasicMessage("info");
  })

  it('createModalMessage', () => {
    let j = service.createModalMessage("info", "test").error;
    let k = service.createModalMessage("info", "test").success;
    let m = service.createModalMessage("info", "test").info;
    let n = service.createModalMessage("info", "test").warning;
  })

  it('setItem', () => {
    let j = service.setItem("info", "test");
    expect(service.getItem('info')).toEqual("test");
  })

  it("removeItem", () => {
    service.removeItem("info");
    expect(service.getItem('info')).toEqual(null);
  })

  it('sortFn', () => {
    let a = { name: "VMware Workspace ONE® Access" }, b = { name: "VMware Workspace ONE Email Notification Service 2 (ENS2)" };
    let o = service.sortFn(a, b);
    expect(o).toEqual(1);
    let p = service.sortFn(b, a);
    expect(p).toEqual(-1);
    let q = service.sortFn(b, b);
    expect(q).toEqual(0);
  })

  it("sortVersion", () => {
    let a = { version: "3.8" },
      b = { version: "3.9" };
    let o = service.sortVersion(a, b);
    expect(o).toEqual(1);
    let p = service.sortVersion(b, a);
    expect(p).toEqual(-1);
    let q = service.sortVersion(b, b);
    expect(q).toEqual(0);
  })

  it("copy", () => {
    service.copy("UpgradePrint");
  })

  it("print", () => {
    service.print("print", "css");
  })

  it("csv", () => {
    service.csv("print", "Interoperability");
  })

  it("removeRepeat", () => {
    let a = [{
      checked: true,
      disabled: true,
      id: "1",
      length: 1,
      name: "AirWatch Inbox for Android",
      releases: [{ childId: 246, childProductName: null, collectionComponents: [], components: [], dLink: null, dummy: false, footnotes: "", gaDate: 1505692800000, genGuided: true, guided: true, id: 2594, major: null, medium: null, minor: null, paramProdId: 1, parentId: null, productId: 246, productName: "AirWatch Inbox for Android", rnLink: null, status: 1, techGuided: true, updateRelease: null, version: "3.4", versioned: 1 }]
    }];
    let o = service.removeRepeat(a);
    expect(o.id).toEqual(undefined);
  })

  it("getNameList", () => {
    let data = [{ childId: null, id: 246, name: "AirWatch Inbox for Android", parentId: null, releases: [{ dLink: null, dummy: false, gaDate: 1500249600000, genGuided: true, guided: true, id: 2452, matrix: null, rnLink: null, rowReleases: null, techGuided: true, version: "3.3 - AirWatch Inbox for Android" }] }];
    let arr = service.getNameList(246, data);
    expect(arr.length).toEqual(0)
  })

  it("getOriginPro", () => {
    let data = [{ childId: null, id: 246, name: "AirWatch Inbox for Android", parentId: null, releases: [{ dLink: null, dummy: false, gaDate: 1500249600000, genGuided: true, guided: true, id: 2452, matrix: null, rnLink: null, rowReleases: null, techGuided: true, version: "3.3 - AirWatch Inbox for Android" }] }];
    let id = service.getOriginPro(246, data);
    expect(id).toEqual(246)
  })

  it("hideTooltip", () => {
    let data = [{ ProductData: "dd", VersionData: [{ genGuided: true, guided: true, id: 2594, }, { genGuided: true, guided: true, id: 2452 }], rebrandNameList: [], selectedPro: 0, selectedReleases: [] }];
    let j = service.hideTooltip(data);
    expect(j).toBe(false);
  })
  it("hideTooltipDB", () => {
    let data = [{ ProductData: "dd", VersionData: [{ genGuided: true, guided: true, id: 2594, }, { genGuided: true, guided: true, id: 2452 }], rebrandNameList: [], selectedPro: 0, selectedReleases: [] }];
    let j = service.hideTooltipDB(data, data);
    expect(j).toBe(false);
  })


});
