<template>
  <div class="error-background">
    <div class="w-9/12 m-auto py-16 fill-page flex items-center justify-center">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8 w-6/12">
        <div class="border-t border-gray-200 text-center pt-8">
          <h1 class="text-9xl font-bold text-purple-400">404</h1>
          <h1 class="text-6xl font-medium py-8">{{ error.message }}</h1>
          <nuxt-link to="/">
            <button
              class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
            >
              Home
            </button></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'error-404',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
.fill-page {
  min-height: calc(100vh - 4rem);
}
.error-background {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='1000' preserveAspectRatio='none' viewBox='0 0 1440 1000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1024%26quot%3b)' fill='none'%3e%3crect width='1440' height='1000' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M625.3%2c742.416C678.087%2c742.002%2c723.309%2c706.282%2c747.511%2c659.368C769.794%2c616.175%2c763.866%2c564.896%2c738.158%2c523.65C713.972%2c484.845%2c671.023%2c462.82%2c625.3%2c463.29C580.415%2c463.751%2c540.429%2c488.022%2c516.389%2c525.929C490.29%2c567.084%2c477.817%2c617.779%2c499.718%2c661.313C523.721%2c709.024%2c571.893%2c742.835%2c625.3%2c742.416' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M983.685%2c479.252C1072.615%2c479.121%2c1162.654%2c451.009%2c1210.075%2c375.777C1260.513%2c295.76%2c1261.16%2c194.061%2c1215.754%2c111.085C1168.454%2c24.648%2c1082.075%2c-43.217%2c983.685%2c-37.935C891.612%2c-32.992%2c835.481%2c53.059%2c791.099%2c133.881C748.956%2c210.626%2c713.496%2c299.975%2c756.137%2c376.445C799.582%2c454.358%2c894.478%2c479.383%2c983.685%2c479.252' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M556.7810667023789 400.0622804977842L816.8281335708299 284.2818667976028 441.0006530021975 140.01521362933318z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1088.8587775557758 196.86466529990082L1049.5429532607113 343.5933191105323 1289.2938461241906 329.20272864781333z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1088.105713261312-62.86298705324356L914.0666275229653-93.55077356674789 883.378841009461 80.48831217159884 1057.4179267478078 111.17609868510317z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M98.753%2c387.444C138.104%2c388.465%2c173.97%2c366.898%2c194.838%2c333.521C217.145%2c297.842%2c225.724%2c253.307%2c205.786%2c216.251C184.905%2c177.443%2c142.81%2c153.903%2c98.753%2c154.94C56.331%2c155.939%2c19.242%2c183.218%2c0.105%2c221.092C-17.328%2c255.594%2c-8.786%2c295.501%2c10.931%2c328.75C30.18%2c361.21%2c61.028%2c386.465%2c98.753%2c387.444' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1156.683%2c1081.98C1246.724%2c1079.88%2c1334.01%2c1037.766%2c1376.332%2c958.264C1416.543%2c882.728%2c1393.962%2c793.231%2c1349.228%2c720.283C1306.835%2c651.153%2c1237.561%2c605.992%2c1156.683%2c600.084C1062.811%2c593.227%2c959.412%2c609.007%2c908.361%2c688.081C853.901%2c772.435%2c864.999%2c884.001%2c918.545%2c968.938C968.769%2c1048.605%2c1062.532%2c1084.175%2c1156.683%2c1081.98' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M438.7137709565692 770.1785356647929L233.3490942678752 571.8601726446373 35.03073124771953 777.2248493333312 240.39540793641353 975.5432123534869z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M542.8065230773551 686.4877899046013L621.2041789700298 599.4183721369241 451.4012243721766 525.3565971817504z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1209.4561648552792 742.7862776097197L1097.3793860541396 962.232075855303 1312.6488643932296 954.7147000236149z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1061.3580348937028-40.03427015884323L901.8592148894302 27.66896214811925 969.5624471963927 187.16778215239185 1129.0612672006653 119.46454984542937z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1284.7940756714922 269.1954211275375L1418.5259360296634 212.42961428063427 1266.5112955802228 40.21472716682911z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1024'%3e%3crect width='1440' height='1000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
}
</style>
