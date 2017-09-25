"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PacketHeader_1 = require("./PacketHeader");
var ACTION_1 = require("./ACTION");
var REQUEST_TYPE_1 = require("./REQUEST_TYPE");
var index_js_1 = require("./../../node_modules/angular2-uuid/index.js");
var PacketHeaderFactory = (function () {
    function PacketHeaderFactory() {
    }
    PacketHeaderFactory.getHeader = function (action) {
        var packetHeader = new PacketHeader_1.PacketHeader();
        var sessionId = localStorage.getItem("sessionId");
        if (sessionId == "" || sessionId == null) {
            packetHeader.sessionId = null;
        }
        else {
            packetHeader.sessionId = sessionId;
        }
        packetHeader.action = action;
        packetHeader.packetId = index_js_1.UUID.UUID();
        switch (action) {
            case ACTION_1.ACTION.SIGN_UP:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.AUTH;
                break;
            case ACTION_1.ACTION.SIGN_IN:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.AUTH;
                break;
            case ACTION_1.ACTION.SIGN_OUT:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.AUTH;
                break;
            case ACTION_1.ACTION.FETCH_MEMBER_ROLES:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_USER_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_CLOSING_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_MY_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_SAVED_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_LOCATION_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_RADIUS_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PRODUCT_TYPE_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PRODUCT_SIZE_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PRODUCT_CATEGORY_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PRODUCT_AMENITY_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_AVAILABILITY_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_STAY_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_SMOKING_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PET_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_OCCUPATION_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_GENDER_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_ROOM_SIZE_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_DURATION_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_MIN_PRICE_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_MAX_PRICE_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_BID_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_ACCOUNT_SETTING_FA:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_MESSAGE_INBOX_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_MESSAGE_INFO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_MESSAGE_SENT_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.FETCH_STAT_LIST:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.REQUEST;
                break;
            case ACTION_1.ACTION.UPDATE_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.UPDATE_USER_PROFILE_PICTURE:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.UPDATE_USER_DOCUMENT:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.UPDATE_USER_LOGO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.UPDATE_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.ADD_PRODUCT:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.ADD_SAVED_PRODUCT:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.ADD_PRODUCT_BID:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.ADD_MESSAGE_TEXT:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.ADD_MESSAGE_INFO:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            case ACTION_1.ACTION.SAVE_ACCOUNT_SETTING_FA:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.UPDATE;
                break;
            default:
                packetHeader.requestType = REQUEST_TYPE_1.REQUEST_TYPE.NONE;
        }
        return packetHeader;
    };
    return PacketHeaderFactory;
}());
exports.PacketHeaderFactory = PacketHeaderFactory;
//# sourceMappingURL=PacketHeaderFactory.js.map