<template>
  <div class="task-tree">
    <div class="tree-filter">
      <el-popover
        popper-class="task-tree__popper"
        ref="textbook"
        placement="bottom-start"
        width="324"
        :disabled="!chosFilter"
        trigger="click">
        <template v-if="isSimple">
          <div class="filter-txt" :class="{'is-open': isOpen}" slot="reference" @click="isOpen = !isOpen">
            <p><i class="label-sub">{{formateName()}}</i>{{getCatalogVal}}</p>
          </div>
          <div class="filter-pop row-line">
            <!-- <div class="filter-pop__row is-curr">
              <p><i class="label-sub">数</i>初一 人教版 2017 上册</p>
            </div> -->
            <div v-for="(item,index) in resourceCatalog"
                 :key="'rci'+index"
                 :class="['filter-pop__row', index == resourceCatalogIndex ? 'is-curr' : '']"
                 @click="setResourceCatalog(index, item)">
              <p><i class="label-sub">{{formateName(item.subjectName)}}</i>{{item.gradeName}} {{item.publisherName}} {{`${item.year}`}} {{item.volumeDictName}}</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="filter-pop">
            <div class="filter-pop__row">
              <div class="filter-pop__label">学科:</div>
              <div class="filter-pop__list" v-if="sectionAndSubjectList.length > 0">
                <template v-for="(item, idx) in sectionAndSubjectList">
                  <div
                    class="filter-pop__item"
                    :class="{
                      'is-selected': subject.id === subjectId && item.id === learnStage.id,
                    }"
                    v-for="(subjectId, sIndex) in item.subjectIds"
                    :key="sIndex + '-' + idx"
                    @click="setSubjectAndLearnStage(item, subjectId, true)">{{ item.name }}{{ convertSubject(subjectId) }}</div>
                </template>
              </div>
            </div>

            <div class="filter-pop__row g-mt16">
              <div class="filter-pop__label">年级:</div>
              <div class="filter-pop__list">
                <div
                  class="filter-pop__item"
                  :class="{
                    'is-selected': grade.id === item.id,
                  }"
                  v-for="(item, index) in gradeList"
                  :key="index"
                  @click="setGrade(item, true)"
                  >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="filter-pop__row g-mt16">
              <div class="filter-pop__label">教材版本:</div>
              <div class="filter-pop__list">
                <div
                  class="filter-pop__item"
                  v-for="(item, index) in publisherList"
                  :key="index"
                  :class="{
                    'is-selected': publisher.id === item.id,
                  }"
                  @click="setPublisher(item, true)"
                  >
                  {{ item.name }}
                </div>
              </div>
            </div>

            <div class="filter-pop__row g-mt16">
              <div class="filter-pop__label">年份:</div>
              <div class="filter-pop__list">
                <div
                  class="filter-pop__item"
                  v-for="(item, index) in textbookYearList"
                  :key="index"
                  :class="{
                    'is-selected': textbookYear === item,
                  }"
                  @click="setTextbookYear(item, true)"
                  >
                  {{ item }}
                </div>
              </div>
            </div>

            <div class="filter-pop__row g-mt16">
              <div class="filter-pop__label">册别:</div>
              <div class="filter-pop__list">
                <div
                  class="filter-pop__item"
                  v-for="(item, index) in volumeList"
                  :key="index"
                  :class="{
                    'is-selected': volume.id === item,
                  }"
                  @click="setVolumeDict(item,true)"
                  >
                  {{ item | convertVolumeDict }}
                </div>
              </div>
            </div>
          </div>
          <div class="filter-txt" :class="{'is-open': isOpen}" slot="reference" @click="chosFilter ? isOpen = !isOpen : ''">
            <p :title="this.grade.name + this.publisher.name + this.textbookYear + this.volume.name">
              <i class="label-sub">
              {{this.subject.name ? this.subject.name[0] : ''}}
              </i>{{this.grade.name}} {{this.publisher.name}} {{this.textbookYear}} {{this.volume.name}}
            </p>
          </div>
        </template>
      </el-popover>
    </div>
    <!-- 章节 -->
    <div>
      <el-tree
        ref="nodeTree"
        :highlight-current="true"
        :accordion="true"
        :data="chapterTree"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        node-key="id"
        icon-class="iconfont i-m-right-hover"
        :render-content="renderContent"
        @node-click="chapterTreeClick"
        ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data:() => {
    return {
      isOpen: true,
      resourceCatalogIndex: 0,
      resourceCatalog: [],
			// 学段
			learnStage: {
				id: '',
				name: '',
			},
			// 学科
			subject: {
				id: '',
				name: '',
			},
			// 年级
			grade: {
				id: '',
				name: '',
			},
			// 教材版本
			publisher: {
				id: '',
				name: '',
			},
			// 册别
			volume: {
				id: '',
				name: '',
			},
			textbookId: '',
			textbookCatalog: {
				id: '',
				name: '',
      },
			// 教材年份
			textbookYear: '',

			sectionAndSubjectList: [],
			subjectList: [],
			gradeList: [],
			publisherList: [],
			textbookYearList: [],
			volumeList: [],

			chapterTree: [],
			defaultProps: {
				children: 'children',
				label: 'name',
      },
      // 默认展开的节点
      defaultExpandedKeys: [],
      // 树节点自动选择
      autoChos: false,
    }
  },
  props: {
    chosFilter: {
      type: Boolean,
      required: false,
      default: true,
    },
    listLen: {
      type: Number,
      required: false,
      default: 0
    },
    selectData: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    // 简单模式
    isSimple: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {
    publisherYear() {
      return {
        publisher: this.publisher.id,
				textbookYear: this.textbookYear,
      }
    },
    getCatalogVal() {
      const item = this.resourceCatalog[this.resourceCatalogIndex];
      if (item) {
        return `${item.gradeName} ${item.publisherName} ${item.year} ${item.volumeDictName}`;
      }
      return '暂无教材信息';
    },
  },
	watch: {
    // 版本年份
    publisherYear: {
      handler: function() {
        // 获取册别信息
        if (this.isSimple) {
          return;
        }
        this.getVolumeDict();
      },
      deep: true
    },
  },
  methods: {
    // 科目名格式化
    formateName(val) {
      if (val) {
        return val[0];
      } else if (this.resourceCatalog[this.resourceCatalogIndex]) {
        return this.resourceCatalog[this.resourceCatalogIndex].subjectName[0];
      } else {
        return '';
      }
    },
		//渲染选择章节部分 提示title
		renderContent(h, {node,data,store}){
      if(data.id === this.textbookCatalog.id && this.autoChos) {
        return(
          <div class="task-tree__tree is-curr" title={node.label}>{node.label}</div>
        )
      } else {
        return(
          <div class="task-tree__tree" title={node.label}>{node.label}</div>
        )
      }
		},
		// 科目id转成科目中文名
		convertSubject(id) {
			return this.subjectList.find(i => i.id === id).name;
		},
		// 选择学科
		setSubjectAndLearnStage(learnStage, subjectId, isClick) {
      if(this.learnStage.id === learnStage.id && this.subject.id === subjectId) {
        return ;
			}

			// 判断是否点击切换科目 && 作业篮是否有已选作业
			if(this.listLen !== 0 && isClick){
				//有的话提示
				this.$confirm('切换科目将清空原有试题，请确认', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					//重新赋值触发更新请求
					this.learnStage.id = learnStage.id;
					this.learnStage.name = learnStage.name;
					this.subject.id = subjectId;
					this.subject.name = this.convertSubject(subjectId);

					// 手动重选学科的情况下才重置试题篮
					// 重置习题栏
          // that.resetSelect();
          // 重置右侧筛选项
          // this.resetFilter();

					// 获取年级列表
          this.getGradeList();

          this.$emit('resetTree', {
            isClear: true
          });
					// 获取习题类型
          // that.getExercisesType();

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消切换'
					});
				});
			}else{//否则不做判断,清空篮子并切换科目
				//重新赋值触发更新请求
				this.learnStage.id = learnStage.id;
				this.learnStage.name = learnStage.name;
				this.subject.id = subjectId;
				this.subject.name = this.convertSubject(subjectId);

				if(isClick) {
					// 手动重选学科的情况下才重置试题篮
					// 重置习题栏
					// this.resetSelect();
          // 重置右侧筛选项
          // this.resetFilter();
				}
				// 获取年级列表
				this.getGradeList();

				// 获取习题类型
        this.$emit('resetTree', {
            isClear: isClick,
            data: {
              learnStage: this.learnStage,
              subject: this.subject,
            }
          });
				// this.getExercisesType();
			}
		},
		// 选择教材版本
		setPublisher(item, isClick) {
      if(isClick && this.publisher.id !== item.id) {
        // 重置右侧筛选项
        // this.resetFilter();
        this.$emit('resetTree', {
            isOnlyFilter: true
          });
      }
			this.publisher.id = item.id;
      this.publisher.name = item.name;
		},
		// 选择年级
		setGrade(item,isClick) {
      if(isClick) {
        if(this.grade.id === item.id) {
          return ;
        } else {
          // 重置右侧筛选项
          this.$emit('resetTree', {
              isOnlyFilter: true
            });
        }
      }
			this.grade.id = item.id;
			this.grade.name = item.name;
			// 获取出版社信息
			this.getPublisher();
		},
		// 选择年份
		setTextbookYear(item, isClick) {
      if(isClick && this.textbookYear !== item) {
        // 重置右侧筛选项
        this.$emit('resetTree', {
            isOnlyFilter: true
          });
      }
			this.textbookYear = item;
    },
		// 册别id转成册别中文名
		convertVolumeDictName(id) {
			return this.$constants.volumeDictMap[id];
		},
		// 选择册别
		setVolumeDict(id,isClick) {
      if(isClick ) {
        if(this.volume.id  === id) {
          return ;
        } else {
          // 重置右侧筛选项
          this.$emit('resetTree', {
              isOnlyFilter: true
            });
        }
			}
			this.volume.id = id;
			this.volume.name = this.convertVolumeDictName(id);
      // 获取课本列表
      this.getTextbookList(isClick);
      // 清除已选章节信息
      this.clearChart();
		},
		// 选择章节
		chapterTreeClick(data, type) {
      if(type === 'AUTO') {
        this.autoChos = true;
        this.$nextTick(() => {
          this.$refs.nodeTree.setCurrentKey(this.isSimple ? this.preCharpter : data.id);
        });
      } else {
        this.autoChos = false;
      }
      if(this.textbookCatalog.id === data.id) {
        return ;
      }
      // 重置右侧筛选项
      this.$emit('resetTree', {
        isOnlyFilter: true
      });
			this.textbookCatalog.id = (type === 'AUTO' && this.isSimple) ? this.preCharpter : data.id;
			this.textbookCatalog.name = data.name;
      // 获取题目列表
      this.$emit('endTree', {
        learnStage:  this.learnStage,
        subject: this.subject,
        grade: this.grade,
        publisher: this.publisher,
        volume: this.volume,
        textbookId: this.textbookId,
        textbookCatalog: this.textbookCatalog,
        textbookCatalogs: this.gettextbookCatalogs(this.textbookCatalog),
        textbookYear: this.textbookYear,
      });
			// this.getQuesList(1);
    },
    // 遍历获取当前选中末级章节 往上逐级章节id
    gettextbookCatalogs(textbookCatalog) {
      const target = textbookCatalog.id;
      const list = this.chapterTree;

      let level = 0;
      let path = [];
      let flag = false;
      if (target && list instanceof Array && list.length > 0) {
        getId(list, 0);
      }

      function getId(ls, level) {
        const slevel = level;
        for (const it of ls) {
          path[slevel] = it.id;
          // 找到
          if (it.id == target) {
            flag = true;
            path[slevel] = it.id;
            path = path.slice(0, slevel + 1);
            return;
          }
          // 有下一级
          if (it.children && it.children.length > 0) {
            getId(it.children, slevel + 1);
          }
          if (flag) {
            return;
          }
          // 无下一级则继续下次循环
        }
      }
      return path;
    },
    // 清空章节数据
    clearChart() {
      this.textbookId = '';
      this.textbookCatalog.id = '';
      this.textbookCatalog.name = '';
			this.quesList = [];
			this.total = 0;
    },
		// 获取学段科目信息
  	async getLearnStages() {
			// const { learnStages = [], subjects } = await this.$http.getLearnStages();
			this.sectionAndSubjectList = [];
      this.subjectList = [{"id":"LANGUAGE","name":"语文"},{"id":"MATH","name":"数学"}];;
      if(this.sectionAndSubjectList.length > 0) {
        // 存在初始数据时才自动设置科目学段
        let learnIndex = 0,subjectId = this.sectionAndSubjectList[learnIndex].subjectIds[0];
        if(this.sectionAndSubjectList.length > 0 && this.selectData && (this.selectData.segementId || this.selectData.segementId === 0) && this.selectData.subjectId) {
          learnIndex = this.sectionAndSubjectList.map(item => item.id).indexOf(this.selectData.segementId);
          subjectId = this.selectData.subjectId;
        }
        if(learnIndex > -1 && subjectId) {
          this.setSubjectAndLearnStage(this.sectionAndSubjectList[learnIndex],subjectId)
        }
      }
		},
		// 获取年级列表
		async getGradeList() {
			const params = {
				learnStageId: this.learnStage.id,
        subjectId: this.subject.id,
			};

      const data = await this.$http.getGradeList(params);
      this.gradeList = data || [];
      if(this.gradeList.length > 0) {
        let gradeIndex = 0;
        // 判断是否有初始化数据
        if(this.selectData.gradeId) {
          gradeIndex = this.gradeList.map(item => item.id).indexOf(parseInt(this.selectData.gradeId));
          if(gradeIndex <= -1) {
            gradeIndex = 0;
          }
        }
        this.setGrade(this.gradeList[gradeIndex]);
      }
		},
		// 获取出版社年份信息
  	async getPublisher() {
			const params = {
				gradeId: this.grade.id,
				subjectId: this.subject.id,
			};
			const data = await this.$http.getPublisher(params);
			this.publisherList = data || [];
			if (this.publisherList.length > 0) {
        let publisherIndex = 0,yearIndex = 0;

        // 总数清空当前版本年份数据
        this.publisher.id = '';
			  this.textbookYear = '';
        // 判断是否有初始化数据
        if(this.selectData.publisherId) {
          publisherIndex = this.publisherList.map(item => item.id).indexOf(parseInt(this.selectData.publisherId));
          if(publisherIndex <= -1) {
            publisherIndex = 0;
          }
        }
        this.setPublisher(this.publisherList[publisherIndex]);
				// 年份
        this.textbookYearList = this.publisherList[publisherIndex].versions;

        // 判断是否有初始化数据
        if(this.selectData.year) {
          yearIndex = this.publisherList[publisherIndex].versions.indexOf(this.selectData.year);
          if(yearIndex <= -1) {
            yearIndex = 0;
          }
        }
        this.setTextbookYear(this.publisherList[publisherIndex].versions[yearIndex]);

			}
		},
		// 获取册别信息
  	async getVolumeDict() {
			const params = {
				publisherId: this.publisher.id,
				version: this.textbookYear,
				learnStageId: this.learnStage.id,
				gradeId: this.grade.id,
				subjectId: this.subject.id,
			};
			const list = await this.$http.getVolumeDict(params);
			if (list.length) {
        this.volumeList = list[0].volumeDictIds;
        let volumeDictIndex = 0;

        // 判断是否有初始化数据
        if(this.selectData.volumeDictId) {
          volumeDictIndex = this.volumeList.indexOf(this.selectData.volumeDictId);
          if(volumeDictIndex <= -1) {
            volumeDictIndex = 0;
          }
        }
        this.setVolumeDict(this.volumeList[volumeDictIndex]);
			}
		},
		// 获取课本列表(听说根据筛选,最后只有一本)
  	async getTextbookList(isClick) {
			const params = {
				learnStageId: this.learnStage.id,
				gradeId: this.grade.id,
				subjectId: this.subject.id,
				publisherId: this.publisher.id,
				version: this.textbookYear,
				volumeDictId: this.volume.id,
			};

      const { textbooks } = await this.$http.getTextbookList(params);
      if(textbooks.length > 0) {
        this.textbookId = textbooks[0].id;

        // 获取章节信息
        this.getTextbookCatalog();
        // if(isClick) {
        //   this.$emit('endTree', {
        //     learnStage:  this.learnStage,
        //     subject: this.subject,
        //     grade: this.grade,
        //     publisher: this.publisher,
        //     volume: this.volume,
        //     textbookId: this.textbookId,
        //     textbookCatalog: this.textbookCatalog,
        //     textbookYear: this.textbookYear,
        //   });
        // }
        // this.getQuesList(1);
      } else {
        this.textbookId = '';
        this.chapterTree = [];
      }
		},
		// 获取章节信息
  	async getTextbookCatalog() {
			const params = {
				textbookId: this.textbookId,
			};

			const { textbookCatalogs = [] } = await this.$http.getTextbookCatalog(params);
      this.chapterTree = textbookCatalogs;
      let selected = this.chapterTree[0];
      if (this.selectData.textbookCatalog) {
        selected = this.selectData.textbookCatalog;
      }
      this.chapterTreeClick(selected, 'AUTO');
      this.defaultExpandedKeys = [selected.id];
    },

    // 简单模式
    // 作业记录编目接口
    async getResourceCatalog() {
      try {
        const data = await this.$http.getResourceCatalog();
        this.resourceCatalog = data || [];
        // this.learnStages.id = data.
        if (data.length > 0) {
          this.setResourceCatalog(0,data[0]);
        }
      } catch (error) {
        this.$message.warning(error.message || '获取记录编目失败!');
      }
    },
    setResourceCatalog(index, item) {
      this.resourceCatalogIndex = index;
      this.learnStage.id = item.segementId;
      this.textbookYear = item.year;
      this.preCharpter = item.draftChapter || '';
      this.grade = {
        id: item.gradeId,
        name: item.gradeName,
      };
      this.subject = {
        id: item.subjectId,
        name: item.subjectName,
      };
      this.volume = {
        id: item.volumeDictId,
        name: item.volumeDictName,
      };
      this.publisher = {
        id: item.publisherId,
        name: item.publisherName,
      };

      this.getTextbookList();
    },
  },
  mounted() {
    if (this.isSimple) {
      // 作业记录编目信息
      this.getResourceCatalog();
    } else {
      // 获取学段科目信息
      this.getLearnStages();
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>

