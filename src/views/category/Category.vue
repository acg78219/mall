<template>
  <div class="wrapper">
    <!-- better-scroll 只会作用与容器的第一个子元素，所以我们要滚动整个 ul  -->
    <ul class="content">
      <li>hello1</li>
      <li>hello2</li>
      <li>hello3</li>
      <li>hello4</li>
      <li>hello5</li>
      <li>hello6</li>
      <li>hello7</li>
      <li>hello8</li>
      <li>hello9</li>
      <li>hello10</li>
      <li>hello11</li>
      <li>hello12</li>
      <li>hello13</li>
      <li>hello14</li>
      <li>hello15</li>
      <li>hello16</li>
      <li>hello17</li>
      <li>hello18</li>
      <li>hello19</li>
      <li>hello20</li>
      <li>hello21</li>
      <li>hello22</li>
      <li>hello23</li>
      <li>hello24</li>
      <li>hello25</li>
      <li>hello26</li>
      <li>hello27</li>
      <li>hello28</li>
      <li>hello29</li>
      <li>hello30</li>
      <li>hello31</li>
      <li>hello32</li>
      <li>hello33</li>
      <li>hello34</li>
      <li>hello35</li>
      <li>hello36</li>
      <li>hello37</li>
      <li>hello38</li>
      <li>hello39</li>
      <li>hello40</li>
      <li>hello41</li>
      <li>hello42</li>
      <li>hello43</li>
      <li>hello44</li>
      <li>hello45</li>
      <li>hello46</li>
      <li>hello47</li>
      <li>hello48</li>
      <li>hello49</li>
      <li>hello50</li>
      <li>hello51</li>
      <li>hello52</li>
      <li>hello53</li>
      <li>hello54</li>
      <li>hello55</li>
      <li>hello56</li>
      <li>hello57</li>
      <li>hello58</li>
      <li>hello59</li>
      <li>hello60</li>
      <li>hello61</li>
      <li>hello62</li>
      <li>hello63</li>
      <li>hello64</li>
      <li>hello65</li>
      <li>hello66</li>
      <li>hello67</li>
      <li>hello68</li>
      <li>hello69</li>
      <li>hello70</li>
      <li>hello71</li>
      <li>hello72</li>
      <li>hello73</li>
      <li>hello74</li>
      <li>hello75</li>
      <li>hello76</li>
      <li>hello77</li>
      <li>hello78</li>
      <li>hello79</li>
      <li>hello80</li>
      <li>hello81</li>
      <li>hello82</li>
      <li>hello83</li>
      <li>hello84</li>
      <li>hello85</li>
      <li>hello86</li>
      <li>hello87</li>
      <li>hello88</li>
      <li>hello89</li>
      <li>hello90</li>
      <li>hello91</li>
      <li>hello92</li>
      <li>hello93</li>
      <li>hello94</li>
      <li>hello95</li>
      <li>hello96</li>
      <li>hello97</li>
      <li>hello98</li>
      <li>hello99</li>
      <li>hello100</li>
    </ul>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'  //引入 better-scroll
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  // 需要在挂载的时候使用 BSscroll，因为只有mounted的时候才会去渲染模板，才有wrapper,content等内容
  mounted() {
    // 生成一个 better-scroll对象实例，第一个参数是容器
    this.scroll =  BSscroll(document.querySelector('.wrapper'), {
        // probeType 决定是否开始 scroll 事件的监听
        probeType: 3,  // 3 是任何情况下都监听，包括滚动的惯性
        pullUpLoad: true  // 开始下拉时触发事件

    })
    // 开启 scroll 实例的监听事件，事件类型是 scroll,默认有一个参数position
    this.scroll.on('scroll',(position) => {
      console.log(position);
    })
    this.scroll.on('pullingUp',() => {
      console.log("上拉");
    })
  }
}
</script>

<style scoped>
  .wrapper {
    /*  css 滚动的原理是子元素的高度超过父元素的高度，所以我们要制定父元素的宽度  */
    height: 200px;
    background-color: red;
  }
</style>
