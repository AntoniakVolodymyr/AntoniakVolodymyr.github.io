const SortingLibrary = {
    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    },

    compare(a, b, ascending) {
        if (a === undefined && b === undefined) return 0;
        if (a === undefined) return ascending ? 1 : -1;
        if (b === undefined) return ascending ? -1 : 1;
        return ascending ? a - b : b - a;
    },

    bubbleSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comparisons++;
                if (this.compare(arr[j], arr[j + 1], ascending) > 0) {
                    this.swap(arr, j, j + 1);
                    swaps++;
                }
            }
        }
        console.log(`Bubble Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },

    selectionSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            let minMaxIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                if (this.compare(arr[j], arr[minMaxIdx], ascending) < 0) {
                    minMaxIdx = j;
                }
            }
            if (minMaxIdx !== i) {
                this.swap(arr, i, minMaxIdx);
                swaps++;
            }
        }
        console.log(`Selection Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },

    insertionSort(arr, ascending = true) {
        let comparisons = 0, shifts = 0;
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && this.compare(arr[j], key, ascending) > 0) {
                comparisons++;
                arr[j + 1] = arr[j];
                shifts++;
                j--;
            }
            arr[j + 1] = key;
        }
        console.log(`Insertion Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${shifts}`);
    },

    shellSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        let gap = Math.floor(arr.length / 2);
        while (gap > 0) {
            for (let i = gap; i < arr.length; i++) {
                let temp = arr[i];
                let j = i;
                while (j >= gap && this.compare(arr[j - gap], temp, ascending) > 0) {
                    comparisons++;
                    arr[j] = arr[j - gap];
                    swaps++;
                    j -= gap;
                }
                arr[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        console.log(`Shell Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },

    quickSort(arr, ascending = true, left = 0, right = arr.length - 1) {
        if (left >= right) return;

        let pivotIndex = Math.floor((left + right) / 2);
        let pivot = arr[pivotIndex];
        let i = pivotIndex;
        while (pivot === undefined && i <= right) {
            i++;
            pivot = arr[i];
        }
        if (pivot === undefined) return; 
        let index = this.partition(arr, left, right, pivot, ascending);
        this.quickSort(arr, ascending, left, index - 1);
        this.quickSort(arr, ascending, index, right);
    },

    partition(arr, left, right, pivot, ascending) {
        let comparisons = 0, swaps = 0;
        while (left <= right) {
            while (this.compare(arr[left], pivot, ascending) < 0) {
                left++;
                comparisons++;
            }
            while (this.compare(arr[right], pivot, ascending) > 0) {
                right--;
                comparisons++;
            }
            if (left <= right) {
                this.swap(arr, left, right);
                swaps++;
                left++;
                right--;
            }
        }
        console.log(`Quick Sort Partition - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
        return left;
    }
};

