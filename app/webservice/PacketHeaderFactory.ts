import {PacketHeader} from './PacketHeader';
import {ACTION} from './ACTION';
import {REQUEST_TYPE} from './REQUEST_TYPE';
import {UUID} from './../../node_modules/angular2-uuid/index.js';

export class PacketHeaderFactory {
    public static getHeader(action: ACTION):PacketHeader{
        let packetHeader = new PacketHeader();
        let sessionId = localStorage.getItem("sessionId");
        if (sessionId == "" || sessionId == null){
            packetHeader.sessionId = null;
        }
        else{
            packetHeader.sessionId = sessionId;
        }
        
        packetHeader.appId = 10001;
      
        packetHeader.action = action;
        packetHeader.packetId = UUID.UUID();
        switch(action){
            case ACTION.SIGN_IN:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;
            case ACTION.SIGN_OUT:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;    
            case ACTION.SIGN_UP:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;    
                
            case ACTION.FETCH_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_ALL_PRODUCT_CATEGORIES:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_ALL_PRODUCT_TYPES:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_ALL_UOMS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCTS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_CUSTOMER_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_CUSTOMERS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_SUPPLIER_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_SUPPLIERS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PURCHASE_ORDER_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_PURCHASE_ORDERS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_SALE_ORDER_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.FETCH_SALE_ORDERS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_CURRENT_STOCK:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCTS_BY_NAME:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PURCHASE_ORDERS_BY_ORDER_NO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SALE_ORDERS_BY_ORDER_NO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SUPPLIERS_BY_NAME:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_CUSTOMERS_BY_NAME:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_CURRENT_STOCK_BY_PRODUCT_NAME:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SUPPLIERS_BY_CELL:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SUPPLIERS_BY_EMAIL:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_CUSTOMERS_BY_CELL:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_CUSTOMERS_BY_EMAIL:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_BY_CODE:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PURCHASE_ORDERS_BY_CELL:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SALE_ORDERS_BY_CELL:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_SUPPLIER_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SUPPLIER_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_USER_ROLE_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_USER_WITH_ROLES:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_USERS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SALE_ORDER_SUMMARY:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PURCHASE_ORDER_SUMMARY:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_ROLES_BY_USER:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_ENDING_CURRENT_STOCK:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_PRODUCT_CATEGORY_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_CATEGORY_BY_TITLE:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_PRODUCTS_WITH_STOCKS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.SEARCH_PRODUCTS_WITH_STOCKS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.SEARCH_PRODUCTS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
                
            case ACTION.ADD_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;    
            case ACTION.ADD_CUSTOMER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;   
            case ACTION.ADD_SUPPLIER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.ADD_PURCHASE_ORDER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;    
            case ACTION.ADD_SALE_ORDER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break; 
            case ACTION.ADD_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.ADD_PRODUCT_CATEGORY_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;    
            
            case ACTION.UPDATE_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_CUSTOMER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;    
            case ACTION.UPDATE_SUPPLIER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break; 
            case ACTION.UPDATE_PURCHASE_ORDER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break; 
            case ACTION.UPDATE_SALE_ORDER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;  
            case ACTION.UPDATE_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_PRODUCT_CATEGORY_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;        
                        
            default:
                packetHeader.requestType = REQUEST_TYPE.NONE
        }
        return packetHeader;
    }
}
