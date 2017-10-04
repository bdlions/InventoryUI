/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketAPI} from './../services/MarketAPI.service';
import {EntityProduct} from '../dto/EntityProduct';
import {EntityProductCategory} from '../dto/EntityProductCategory';
import {EntityProductType} from '../dto/EntityProductType';
import {EntityUOM} from '../dto/EntityUOM';

@Component({
    selector: 'app',
    templateUrl: 'app/html/product/manageproduct.component.html'
})

export class ManageProductComponent {
    private subscribe: Subscription;
    private entityProduct: EntityProduct;
    private searchEntityProduct: EntityProduct;
    private productCategoryList: EntityProductCategory[];
    private productTypeList: EntityProductType[];
    private uomList: EntityUOM[];
    private productList: EntityProduct[];
    private productId: number;

    constructor(private marketAPI: MarketAPI, private router: Router, public route: ActivatedRoute) {
        this.searchEntityProduct = new EntityProduct();
        this.entityProduct = JSON.parse("{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"length\":\"10 cm\",\"width\":\"20 cm\",\"height\":\"30 cm\",\"weight\":\"40 cm\",\"remark\":\"This is a good product...\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":true}");
        this.productCategoryList = JSON.parse("[{\"id\":1,\"title\":\"Product category1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product category2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        this.productTypeList = JSON.parse("[{\"id\":1,\"title\":\"Product type1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"Product type2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        this.uomList = JSON.parse("[{\"id\":1,\"title\":\"UOM1\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"title\":\"UOM2\",\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        this.productList = JSON.parse("[{\"id\":1,\"name\":\"product1\",\"code\":\"code1\",\"categoryId\":1,\"categoryTitle\":\"Product category1\",\"typeId\":1,\"typeTitle\":\"Product type1\",\"unitPrice\":10.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":2,\"name\":\"product2\",\"code\":\"code2\",\"categoryId\":2,\"categoryTitle\":\"Product category2\",\"typeId\":2,\"typeTitle\":\"Product type2\",\"unitPrice\":20.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":3,\"name\":\"product3\",\"code\":\"code3\",\"categoryId\":3,\"categoryTitle\":\"Product category3\",\"typeId\":3,\"typeTitle\":\"Product type3\",\"unitPrice\":30.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":4,\"name\":\"product4\",\"code\":\"code4\",\"categoryId\":4,\"categoryTitle\":\"Product category4\",\"typeId\":4,\"typeTitle\":\"Product type4\",\"unitPrice\":40.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":5,\"name\":\"product5\",\"code\":\"code5\",\"categoryId\":5,\"categoryTitle\":\"Product category5\",\"typeId\":5,\"typeTitle\":\"Product type5\",\"unitPrice\":50.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":6,\"name\":\"product6\",\"code\":\"code6\",\"categoryId\":6,\"categoryTitle\":\"Product category6\",\"typeId\":6,\"typeTitle\":\"Product type6\",\"unitPrice\":60.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":7,\"name\":\"product7\",\"code\":\"code7\",\"categoryId\":7,\"categoryTitle\":\"Product category7\",\"typeId\":7,\"typeTitle\":\"Product type17\",\"unitPrice\":70.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":8,\"name\":\"product8\",\"code\":\"code8\",\"categoryId\":8,\"categoryTitle\":\"Product category8\",\"typeId\":8,\"typeTitle\":\"Product type8\",\"unitPrice\":80.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":9,\"name\":\"product9\",\"code\":\"code9\",\"categoryId\":9,\"categoryTitle\":\"Product category9\",\"typeId\":9,\"typeTitle\":\"Product type9\",\"unitPrice\":90.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":10,\"name\":\"product10\",\"code\":\"code1\",\"categoryId\":10,\"categoryTitle\":\"Product category10\",\"typeId\":10,\"typeTitle\":\"Product type10\",\"unitPrice\":100.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":11,\"name\":\"product11\",\"code\":\"code11\",\"categoryId\":11,\"categoryTitle\":\"Product category11\",\"typeId\":11,\"typeTitle\":\"Product type11\",\"unitPrice\":110.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false},{\"id\":12,\"name\":\"product12\",\"code\":\"code12\",\"categoryId\":12,\"categoryTitle\":\"Product category12\",\"typeId\":12,\"typeTitle\":\"Product type12\",\"unitPrice\":120.0,\"standardUOMId\":0,\"saleUOMId\":0,\"purchaseUOMId\":0,\"createdOn\":0,\"modifiedOn\":0,\"reasonCode\":1000,\"success\":false}]");
        console.log(this.entityProduct);
        console.log(this.productCategoryList);
        console.log(this.productTypeList);
        console.log(this.uomList);
        console.log(this.productList);
    }

    ngOnInit() {
        this.subscribe = this.route.params.subscribe(params => {
            this.productId = params['productId'];
            console.log(this.productId);
        });
    }

    searchProduct(event: Event) {
        //console.log("Search Product");
        console.log(this.searchEntityProduct.name);
    }
    newProduct(event: Event) {
        console.log(this.entityProduct.name);
    }
    saveProduct(event: Event) {
        console.log(this.entityProduct.name);
    }
    selectedProduct(event: Event, id: number) {
        console.log(id);
    }
}
