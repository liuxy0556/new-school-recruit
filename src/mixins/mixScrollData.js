export default {
  data () {
    return {
      mixScrollData: {
        fetching: false,
        items: [],
        pagination: null,
        apiFunc: null,
        apiParams: null,
      }
    }
  },
  computed: {
    mixScrollParams () {
      return Object.assign({
        current: (this.mixScrollData.pagination && this.mixScrollData.pagination.current) || 1,
        pageSize: (this.mixScrollData.pagination && this.mixScrollData.pagination.pageSize) || 10
      }, this.mixScrollData.query)
    }
  },
  methods: {
    fetchScrollData () { console.log('default fetchData') },
    _fetchScrollData (apiFunc, params, appendMore = false) {
      this.apiFunc = apiFunc
      this.apiParams = params
      this.mixScrollData.fetching = true
      return apiFunc(params).then(res => {
        if (res.code == 200) {
          // console.log(res)
          this.mixScrollData.fetching = false
          if (appendMore) {
            this.mixScrollData.items = this.mixScrollData.items.concat(res.data)
          } else {
            // console.log(111, data)
            this.mixScrollData.items = res.data
          }
          this.mixScrollData.pagination = {page: res.page, pageSize: res.pageSize, total: res.total}
          let hasMore = this.mixScrollData.pagination.total > this.mixScrollData.items.length ? true : false
          // console.log('hasMore', hasMore)
          this.$refs['bScrollRef'] && this.$refs['bScrollRef'].stopLoading(hasMore)
        }
        return res
      }).catch(err => {
        console.error(err)
        this.mixScrollData.fetching = false
      })
    },
    mixLoadMoreScrollData () {
      this.apiFunc && this._fetchScrollData(this.apiFunc, Object.assign(this.apiParams, {
        page: this.mixScrollData.pagination.page + 1,
        pageSize: this.mixScrollData.pagination.pageSize
      }), true)
    }
  }
}
