<script setup lang="ts">
// 背景色
useHead({
  bodyAttrs: {
    class: 'dark:bg-gray-900',
  },
})

// バージョン
const version = ref('')
onMounted(async () => {
  try {
    const response = await fetch('version')
    const data = await response.text()
    version.value = data
  }
  catch (error) {
    console.error('failed version fetch:', error)
  }
})

// ロジック
interface User {
  id: number
  name: string
  time?: number
}
const users: Ref<User[]> = ref([])
const addUser = () => {
  users.value.push({
    id: users.value.length + 1,
    name: '',
    time: undefined,
  })
}

const result = computed(() => {
  const sortedUsers = users.value
    .filter(w => typeof w.time !== 'undefined')
    .sort((a, b) => b.time! - a.time!)
  const time: string[] = []
  let i = 1
  for (const user of sortedUsers) {
    if (i === 1) {
      time.push(`${i}. ${user.name}`)
    }
    else {
      const firstUser = sortedUsers[0]
      time.push(`${i}. ${user.name} → ${firstUser?.name}の${firstUser!.time! - user.time!}秒後`)
    }
    i++
  }
  return time.join('\n')
})

const { copy, copied, isSupported } = useClipboard()

const demo = () => {
  users.value = [{
    id: 1,
    name: 'Aさん',
    time: 50,
  }, {
    id: 2,
    name: 'Bさん',
    time: 20,
  }]
}

const toast = useToast()
const copyToClipBoard = async () => {
  if (copied.value) return undefined

  await copy(result.value)
  if (copied.value) {
    toast.add({ title: 'コピーしました' })
  }
  else {
    toast.add({ title: 'コピーに失敗しました', color: 'red' })
  }
}

onMounted(() => {
  addUser()
  addUser()
})
</script>

<template>
  <div class="max-w-xl m-auto mt-4 px-2 sm:px-0 mx-auto">
    <h1 class="text-2xl font-bold">
      ホワイトアウトサバイバル 波状計算機
    </h1>
    <h2 class="text-xl text-right font-bold">
      ver {{ version }}
    </h2>
    <p class="mt-1">
      波状攻撃の計算を行います。
      <ULink
        class="text-sky-500 hover:text-sky-800"
        @click="demo"
      >
        サンプル
      </ULink>
    </p>
    <section class="mt-4">
      <div
        v-for="user of users"
        :key="user.id"
        class="columns-2 mt-2 h-[4rem]"
      >
        <UFormGroup label="名前">
          <UInput v-model="user.name" />
        </UFormGroup>
        <UFormGroup label="時間">
          <UInput
            v-model="user.time"
            type="number"
          />
        </UFormGroup>
      </div>
    </section>
    <div class="text-center mt-4">
      <UButton
        icon="i-heroicons-plus"
        @click="addUser"
      >
        追加
      </UButton>
    </div>
    <section v-if="result">
      <div class="text-right">
        <UButton
          :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
          color="blue"
          :disabled="!isSupported"
          @click="copyToClipBoard"
        >
          コピー
        </UButton>
      </div>
      <UCard
        class="mt-4"
      >
        <pre>{{ result }}</pre>
      </UCard>
    </section>
  </div>

  <UNotifications />
</template>
