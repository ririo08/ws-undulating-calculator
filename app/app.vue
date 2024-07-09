<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'dark:bg-gray-900'
  }
})

const version = ref('')
onMounted(async () => {
  try {
    const response = await fetch('version')
    const data = await response.text()
    version.value = data
  } catch (error) {
    console.error('failed version fetch:', error)
  }
})
</script>

<template>
  <div class="max-w-xl m-auto mt-4">
    <h1 class="text-2xl font-bold">
      ホワイトアウトサバイバル 波状計算機 ver {{ version }}
    </h1>
    <p class="mt-1">
      srtファイルからテキスト情報のみを抽出してダウンロードすることができます。<br>
      事前に結果も確認することができます。
    </p>
  </div>
</template>
