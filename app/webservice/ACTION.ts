export enum ACTION{
    SIGN_IN = 1001,
    SIGN_OUT = 1002,
    SIGN_UP = 1003,
    
    FETCH_USER_INFO = 2001,
    FETCH_ALL_PRODUCT_CATEGORIES = 2002,
    FETCH_ALL_PRODUCT_TYPES = 2003,
    FETCH_ALL_UOMS = 2004,
    FETCH_PRODUCT_INFO = 2005,
    FETCH_PRODUCTS = 2006,
    FETCH_CUSTOMER_INFO = 2007,
    FETCH_CUSTOMERS = 2008,
    FETCH_SUPPLIER_INFO = 2009,
    FETCH_SUPPLIERS = 2010,
    FETCH_PURCHASE_ORDER_INFO = 2011,
    FETCH_PURCHASE_ORDERS = 2012,
    FETCH_SALE_ORDER_INFO = 2013,
    FETCH_SALE_ORDERS = 2014,
    FETCH_CURRENT_STOCK = 2015,
    FETCH_PRODUCTS_BY_NAME = 2016,
    FETCH_PURCHASE_ORDERS_BY_ORDER_NO = 2017,
    FETCH_SALE_ORDERS_BY_ORDER_NO = 2018,
    FETCH_SUPPLIERS_BY_NAME = 2019,
    FETCH_CUSTOMERS_BY_NAME = 2020,
    FETCH_CURRENT_STOCK_BY_PRODUCT_NAME = 2021,
    FETCH_SUPPLIERS_BY_CELL = 2022,
    FETCH_SUPPLIERS_BY_EMAIL = 2023,
    FETCH_CUSTOMERS_BY_CELL = 2024,
    FETCH_CUSTOMERS_BY_EMAIL = 2025,
    FETCH_PRODUCT_BY_CODE = 2026,
    FETCH_PURCHASE_ORDERS_BY_CELL = 2027,
    FETCH_SALE_ORDERS_BY_CELL = 2028,
    FETCH_PRODUCT_SUPPLIER_LIST = 2029,
    FETCH_SUPPLIER_PRODUCT_LIST = 2030,
    FETCH_USER_ROLE_LIST = 2031,
    FETCH_USER_WITH_ROLES = 2032,
    FETCH_USERS = 2033,
    FETCH_SALE_ORDER_SUMMARY = 2034,
    FETCH_PURCHASE_ORDER_SUMMARY = 2035,
    FETCH_ROLES_BY_USER = 2036,
    FETCH_ENDING_CURRENT_STOCK = 2037,
    
    ADD_PRODUCT_INFO = 3001,
    ADD_CUSTOMER_INFO = 3002,
    ADD_SUPPLIER_INFO = 3003,
    ADD_PURCHASE_ORDER_INFO = 3004,
    ADD_SALE_ORDER_INFO = 3005,
    ADD_USER_INFO = 3006,
    
    UPDATE_PRODUCT_INFO = 4001,
    UPDATE_CUSTOMER_INFO = 4002,
    UPDATE_SUPPLIER_INFO = 4003,
    UPDATE_PURCHASE_ORDER_INFO = 4004,
    UPDATE_SALE_ORDER_INFO = 4005,
    UPDATE_USER_INFO = 4006,
}