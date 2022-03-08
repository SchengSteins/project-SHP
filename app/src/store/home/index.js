import { reqGetCategoryList ,reqGetBannerList,reqGetFloorList} from "@/api";
//home模块的小仓库
const state = {
    //state中的数据默认初始值根据接口返回类型进行初始化
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    //通过API里面的接口函数调用，想服务器发请求，获取服务器的数据
    async getCategoryList({commit}){
        let result = await reqGetCategoryList();
        if(result.code == 200){
            commit("GETCATEGORYLIST",result.data);
        }
    },
    //获取首页轮播图
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200){
            commit("GETBANNERLIST",result.data);
        }
    },
    //获取Floor数据
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code == 200){
            commit("GETFLOORLIST",result.data);
        }
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}