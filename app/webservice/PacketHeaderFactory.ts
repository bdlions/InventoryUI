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
            
            case ACTION.UPDATE_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_CUSTOMER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;    
            case ACTION.UPDATE_SUPPLIER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;        
                        
            default:
                packetHeader.requestType = REQUEST_TYPE.NONE
        }
        return packetHeader;
    }
}