<template>
  <header class="header">
    <h1 class="header__heading">Проведение ТО и мелкий ремонт</h1>
    <nav class="header__navigation">
      <ul class="header__navigation-list">
        <li class="header__item">
          <router-link to="/common" class="header__navigation-link">
            Общее
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/" exact class="header__navigation-link">
            Товар списания
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/addtnl-expenses" class="header__navigation-link">
            Доп. расходы
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {},
  components: {},
};
</script>

<style lang="sass">
.header
  margin: 0 0 25px

  &__heading
    margin: 0 0 25px
    font-weight: 400
    font-size: 30px
    line-height: 31px

  &__navigation-list
    padding: 0
    list-style: none
    display: flex
    gap: 0 20px

  &__navigation-link
    text-decoration: none
    font-weight: 600
    color: #1253a2
    transition: opacity 0.5s
    &:hover
      opacity: 0.8

  &__navigation-link.active
    color: #000
</style>
